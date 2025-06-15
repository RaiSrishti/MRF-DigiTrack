from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.waste import WasteSale
from app.models.user import User
from app.api.deps import get_current_active_user, get_current_active_manager
from app.db.mongodb import mongodb
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=WasteSale)
async def create_sale(
    sale: WasteSale,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if current_user.role not in ["operator", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create sales records"
        )
    
    # Calculate total amount
    sale.total_amount = sale.weight * sale.unit_price
    sale.operator_id = str(current_user.id)
    
    result = await mongodb.get_db()["waste_sales"].insert_one(sale.dict(by_alias=True))
    created_sale = await mongodb.get_db()["waste_sales"].find_one({"_id": result.inserted_id})
    return WasteSale(**created_sale)

@router.get("/", response_model=List[WasteSale])
async def get_sales(
    mrf_id: str,
    start_date: datetime = None,
    end_date: datetime = None,
    category: str = None,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    query = {"mrf_id": mrf_id}
    if start_date and end_date:
        query["date"] = {"$gte": start_date, "$lte": end_date}
    if category:
        query["category"] = category
    
    sales = await mongodb.get_db()["waste_sales"].find(query).to_list(length=None)
    return [WasteSale(**sale) for sale in sales]

@router.get("/summary", response_model=dict)
async def get_sales_summary(
    mrf_id: str,
    start_date: datetime = None,
    end_date: datetime = None,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    match_query = {"mrf_id": mrf_id}
    if start_date and end_date:
        match_query["date"] = {"$gte": start_date, "$lte": end_date}
    
    pipeline = [
        {"$match": match_query},
        {
            "$group": {
                "_id": "$category",
                "total_weight": {"$sum": "$weight"},
                "total_amount": {"$sum": "$total_amount"},
                "count": {"$sum": 1}
            }
        }
    ]
    
    summary = await mongodb.get_db()["waste_sales"].aggregate(pipeline).to_list(length=None)
    
    # Calculate overall totals
    total_weight = sum(item["total_weight"] for item in summary)
    total_amount = sum(item["total_amount"] for item in summary)
    total_transactions = sum(item["count"] for item in summary)
    
    return {
        "category_wise": summary,
        "overall": {
            "total_weight": total_weight,
            "total_amount": total_amount,
            "total_transactions": total_transactions
        }
    }

@router.put("/{sale_id}", response_model=WasteSale)
async def update_sale(
    sale_id: str,
    sale_update: WasteSale,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    # Only managers can update sales records
    existing_sale = await mongodb.get_db()["waste_sales"].find_one({"_id": ObjectId(sale_id)})
    if not existing_sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sale record not found"
        )
    
    # Update total amount
    sale_update.total_amount = sale_update.weight * sale_update.unit_price
    sale_update.updated_at = datetime.utcnow()
    
    await mongodb.get_db()["waste_sales"].update_one(
        {"_id": ObjectId(sale_id)},
        {"$set": sale_update.dict(exclude_unset=True)}
    )
    
    updated_sale = await mongodb.get_db()["waste_sales"].find_one({"_id": ObjectId(sale_id)})
    return WasteSale(**updated_sale) 