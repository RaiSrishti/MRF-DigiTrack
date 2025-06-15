from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User, UserCreate, UserInDB
from app.api.deps import get_current_active_user, get_current_active_manager
from app.core.security import get_password_hash
from app.db.mongodb import mongodb
from bson import ObjectId

router = APIRouter()

@router.get("/me", response_model=User)
async def read_user_me(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    return current_user

@router.put("/me", response_model=User)
async def update_user_me(
    user_update: UserCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Only allow updating certain fields
    update_data = user_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    # Don't allow role changes through this endpoint
    if "role" in update_data:
        del update_data["role"]
    
    await mongodb.get_db()["users"].update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": update_data}
    )
    
    updated_user = await mongodb.get_db()["users"].find_one({"_id": ObjectId(current_user.id)})
    return User(**updated_user)

@router.get("/", response_model=List[User])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    mrf_id: str = None,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    query = {}
    if mrf_id:
        query["mrf_id"] = mrf_id
    
    users = await mongodb.get_db()["users"].find(query).skip(skip).limit(limit).to_list(length=None)
    return [User(**user) for user in users]

@router.post("/", response_model=User)
async def create_user(
    user_in: UserCreate,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    # Check if user already exists
    if await mongodb.get_db()["users"].find_one({"email": user_in.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = user_in.dict()
    user_dict["hashed_password"] = get_password_hash(user_in.password)
    del user_dict["password"]
    
    user = UserInDB(**user_dict)
    result = await mongodb.get_db()["users"].insert_one(user.dict(by_alias=True))
    
    created_user = await mongodb.get_db()["users"].find_one({"_id": result.inserted_id})
    return User(**created_user)

@router.get("/{user_id}", response_model=User)
async def read_user(
    user_id: str,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    user = await mongodb.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return User(**user)

@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: str,
    user_update: UserCreate,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    user = await mongodb.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    update_data = user_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    await mongodb.get_db()["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    updated_user = await mongodb.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    return User(**updated_user)

@router.delete("/{user_id}", response_model=User)
async def delete_user(
    user_id: str,
    current_user: User = Depends(get_current_active_manager)
) -> Any:
    user = await mongodb.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Soft delete - just mark as inactive
    await mongodb.get_db()["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"is_active": False}}
    )
    
    return User(**user) 