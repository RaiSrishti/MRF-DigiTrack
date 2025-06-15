from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.waste import WasteIntake, SortedWaste, WasteCategory
from app.models.user import User
from app.api.deps import get_current_active_user
from app.db.mongodb import mongodb
from datetime import datetime, timedelta
from bson import ObjectId

router = APIRouter()

@router.post("/intake", response_model=WasteIntake)
async def create_waste_intake(
    intake: WasteIntake,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if current_user.role not in ["operator", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create waste intake records"
        )
    
    intake.operator_id = str(current_user.id)
    result = await mongodb.get_db()["waste_intake"].insert_one(intake.dict(by_alias=True))
    created_intake = await mongodb.get_db()["waste_intake"].find_one({"_id": result.inserted_id})
    return WasteIntake(**created_intake)

@router.get("/intake", response_model=List[WasteIntake])
async def get_waste_intakes(
    mrf_id: str,
    start_date: datetime = None,
    end_date: datetime = None,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    query = {"mrf_id": mrf_id}
    if start_date and end_date:
        query["date"] = {"$gte": start_date, "$lte": end_date}
    
    intakes = await mongodb.get_db()["waste_intake"].find(query).to_list(length=None)
    return [WasteIntake(**intake) for intake in intakes]

@router.post("/sort", response_model=SortedWaste)
async def create_sorted_waste(
    sorted_waste: SortedWaste,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if current_user.role not in ["operator", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create sorted waste records"
        )
    
    # Verify that the intake exists
    intake = await mongodb.get_db()["waste_intake"].find_one({"_id": ObjectId(sorted_waste.intake_id)})
    if not intake:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Waste intake record not found"
        )
    
    sorted_waste.operator_id = str(current_user.id)
    result = await mongodb.get_db()["sorted_waste"].insert_one(sorted_waste.dict(by_alias=True))
    created_sorted = await mongodb.get_db()["sorted_waste"].find_one({"_id": result.inserted_id})
    return SortedWaste(**created_sorted)

@router.get("/sort", response_model=List[SortedWaste])
async def get_sorted_waste(
    intake_id: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    sorted_wastes = await mongodb.get_db()["sorted_waste"].find(
        {"intake_id": intake_id}
    ).to_list(length=None)
    return [SortedWaste(**waste) for waste in sorted_wastes]

@router.get("/categories", response_model=List[WasteCategory])
async def get_waste_categories(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    categories = await mongodb.get_db()["waste_categories"].find().to_list(length=None)
    return [WasteCategory(**category) for category in categories]

@router.post("/categories", response_model=WasteCategory)
async def create_waste_category(
    category: WasteCategory,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if current_user.role != "manager":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only managers can create waste categories"
        )
    result = await mongodb.get_db()["waste_categories"].insert_one(category.dict())
    created_category = await mongodb.get_db()["waste_categories"].find_one({"_id": result.inserted_id})
    return WasteCategory(**created_category) 