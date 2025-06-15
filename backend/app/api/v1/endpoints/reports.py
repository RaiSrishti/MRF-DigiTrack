from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.api.deps import get_current_active_user, get_current_active_panchayat
from app.db.mongodb import mongodb
from datetime import datetime, timedelta
from bson import ObjectId

router = APIRouter()

@router.get("/daily", response_model=dict)
async def get_daily_report(
    mrf_id: str,
    date: datetime,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Get waste intake for the day
    intake_pipeline = [
        {
            "$match": {
                "mrf_id": mrf_id,
                "date": {
                    "$gte": datetime.combine(date.date(), datetime.min.time()),
                    "$lte": datetime.combine(date.date(), datetime.max.time())
                }
            }
        },
        {
            "$group": {
                "_id": None,
                "total_weight": {"$sum": "$weight"},
                "count": {"$sum": 1}
            }
        }
    ]
    
    intake_summary = await mongodb.get_db()["waste_intake"].aggregate(intake_pipeline).to_list(length=None)
    
    # Get sorted waste for the day
    sorted_pipeline = [
        {
            "$match": {
                "date": {
                    "$gte": datetime.combine(date.date(), datetime.min.time()),
                    "$lte": datetime.combine(date.date(), datetime.max.time())
                }
            }
        },
        {
            "$group": {
                "_id": "$category",
                "total_weight": {"$sum": "$weight"}
            }
        }
    ]
    
    sorted_summary = await mongodb.get_db()["sorted_waste"].aggregate(sorted_pipeline).to_list(length=None)
    
    # Get sales for the day
    sales_pipeline = [
        {
            "$match": {
                "mrf_id": mrf_id,
                "date": {
                    "$gte": datetime.combine(date.date(), datetime.min.time()),
                    "$lte": datetime.combine(date.date(), datetime.max.time())
                }
            }
        },
        {
            "$group": {
                "_id": "$category",
                "total_weight": {"$sum": "$weight"},
                "total_amount": {"$sum": "$total_amount"},
                "count": {"$sum": 1}
            }
        }
    ]
    
    sales_summary = await mongodb.get_db()["waste_sales"].aggregate(sales_pipeline).to_list(length=None)
    
    return {
        "date": date.date(),
        "waste_intake": intake_summary[0] if intake_summary else {"total_weight": 0, "count": 0},
        "sorted_waste": sorted_summary,
        "sales": sales_summary
    }

@router.get("/monthly", response_model=dict)
async def get_monthly_report(
    mrf_id: str,
    year: int,
    month: int,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = datetime(year, month + 1, 1) - timedelta(days=1)
    
    # Get daily summaries for the month
    daily_summaries = []
    current_date = start_date
    while current_date <= end_date:
        daily_report = await get_daily_report(mrf_id, current_date, current_user)
        daily_summaries.append(daily_report)
        current_date += timedelta(days=1)
    
    # Calculate monthly totals
    monthly_totals = {
        "total_intake_weight": sum(day["waste_intake"]["total_weight"] for day in daily_summaries),
        "total_intake_count": sum(day["waste_intake"]["count"] for day in daily_summaries),
        "total_sales_amount": sum(
            sum(category["total_amount"] for category in day["sales"])
            for day in daily_summaries
        ),
        "total_sales_weight": sum(
            sum(category["total_weight"] for category in day["sales"])
            for day in daily_summaries
        )
    }
    
    return {
        "year": year,
        "month": month,
        "daily_summaries": daily_summaries,
        "monthly_totals": monthly_totals
    }

@router.get("/panchayat", response_model=dict)
async def get_panchayat_report(
    start_date: datetime,
    end_date: datetime,
    current_user: User = Depends(get_current_active_panchayat)
) -> Any:
    # Only panchayat officials can access this report
    pipeline = [
        {
            "$match": {
                "date": {"$gte": start_date, "$lte": end_date}
            }
        },
        {
            "$group": {
                "_id": "$mrf_id",
                "total_intake_weight": {"$sum": "$weight"},
                "intake_count": {"$sum": 1}
            }
        }
    ]
    
    mrf_summary = await mongodb.get_db()["waste_intake"].aggregate(pipeline).to_list(length=None)
    
    # Get sales summary for each MRF
    sales_pipeline = [
        {
            "$match": {
                "date": {"$gte": start_date, "$lte": end_date}
            }
        },
        {
            "$group": {
                "_id": "$mrf_id",
                "total_sales_amount": {"$sum": "$total_amount"},
                "total_sales_weight": {"$sum": "$weight"},
                "transaction_count": {"$sum": 1}
            }
        }
    ]
    
    sales_summary = await mongodb.get_db()["waste_sales"].aggregate(sales_pipeline).to_list(length=None)
    
    # Combine the summaries
    mrf_data = {}
    for mrf in mrf_summary:
        mrf_id = mrf["_id"]
        mrf_data[mrf_id] = {
            "total_intake_weight": mrf["total_intake_weight"],
            "intake_count": mrf["intake_count"],
            "total_sales_amount": 0,
            "total_sales_weight": 0,
            "transaction_count": 0
        }
    
    for sale in sales_summary:
        mrf_id = sale["_id"]
        if mrf_id in mrf_data:
            mrf_data[mrf_id].update({
                "total_sales_amount": sale["total_sales_amount"],
                "total_sales_weight": sale["total_sales_weight"],
                "transaction_count": sale["transaction_count"]
            })
    
    return {
        "start_date": start_date,
        "end_date": end_date,
        "mrf_summary": mrf_data,
        "overall_totals": {
            "total_intake_weight": sum(mrf["total_intake_weight"] for mrf in mrf_data.values()),
            "total_intake_count": sum(mrf["intake_count"] for mrf in mrf_data.values()),
            "total_sales_amount": sum(mrf["total_sales_amount"] for mrf in mrf_data.values()),
            "total_sales_weight": sum(mrf["total_sales_weight"] for mrf in mrf_data.values()),
            "total_transactions": sum(mrf["transaction_count"] for mrf in mrf_data.values())
        }
    } 