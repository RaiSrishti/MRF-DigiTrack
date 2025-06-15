from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class WasteCategory(BaseModel):
    name: str
    description: Optional[str] = None
    unit_price: float = 0.0

class WasteIntake(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    mrf_id: str
    vehicle_id: str
    weight: float
    date: datetime = Field(default_factory=datetime.utcnow)
    operator_id: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SortedWaste(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    intake_id: str
    category: str
    weight: float
    operator_id: str
    date: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class WasteSale(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    category: str
    weight: float
    unit_price: float
    total_amount: float
    buyer_name: str
    buyer_contact: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)
    operator_id: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str} 