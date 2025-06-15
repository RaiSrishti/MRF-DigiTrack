from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.user import User, UserCreate, UserInDB
from app.db.mongodb import mongodb
from bson import ObjectId

router = APIRouter()

@router.post("/login", response_model=dict)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = await mongodb.get_db()["users"].find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": User(**user)
    }

@router.post("/register", response_model=User)
async def register(user_in: UserCreate) -> Any:
    # Check if user already exists
    if await mongodb.get_db()["users"].find_one({"email": user_in.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Create new user
    user_dict = user_in.dict()
    user_dict["hashed_password"] = get_password_hash(user_in.password)
    del user_dict["password"]
    
    user = UserInDB(**user_dict)
    result = await mongodb.get_db()["users"].insert_one(user.dict(by_alias=True))
    
    created_user = await mongodb.get_db()["users"].find_one({"_id": result.inserted_id})
    return User(**created_user) 