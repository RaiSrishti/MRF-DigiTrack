from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, waste, sales, reports

api_router = APIRouter()
 
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(waste.router, prefix="/waste", tags=["waste management"])
api_router.include_router(sales.router, prefix="/sales", tags=["sales"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"]) 