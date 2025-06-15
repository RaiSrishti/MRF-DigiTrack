from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router
from app.db.mongodb import mongodb

app = FastAPI(
    title="MRF DigiTrack API",
    description="API for Material Recovery Facility Digital Tracking System",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
async def startup_db_client():
    await mongodb.connect_to_mongodb()

@app.on_event("shutdown")
async def shutdown_db_client():
    await mongodb.close_mongodb_connection()

@app.get("/")
async def root():
    return {
        "message": "Welcome to MRF DigiTrack API",
        "version": "1.0.0",
        "docs_url": "/docs",
    } 