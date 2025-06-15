# from typing import List
# from pydantic_settings import BaseSettings
# from pydantic import AnyHttpUrl, validator
# import os
# from dotenv import load_dotenv

# load_dotenv()

# class Settings(BaseSettings):
#     API_V1_STR: str = "/api/v1"
#     PROJECT_NAME: str = "MRF DigiTrack"
    
#     # CORS Configuration
#     CORS_ORIGINS: List[AnyHttpUrl] = [
#         "http://localhost:3000",  # React dev server
#         "http://localhost:5173",  # Vite dev server
#     ]

#     @validator("CORS_ORIGINS", pre=True)
#     def assemble_cors_origins(cls, v: str | List[str]) -> List[str] | str:
#         if isinstance(v, str) and not v.startswith("["):
#             return [i.strip() for i in v.split(",")]
#         elif isinstance(v, (list, str)):
#             return v
#         raise ValueError(v)

#     # MongoDB Configuration
#     MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
#     MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "mrf_digitrack")

#     # JWT Configuration
#     SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
#     ALGORITHM: str = "HS256"
#     ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

#     # Environment
#     ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
#     DEBUG: bool = ENVIRONMENT == "development"

#     class Config:
#         case_sensitive = True

# settings = Settings() /
# app/core/config.py

from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "MRF DigiTrack"

    # CORS Configuration
    CORS_ORIGINS: Union[str, List[AnyHttpUrl]] = []

    @validator("CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list):
            return v
        raise ValueError("Invalid CORS_ORIGINS format")

    # MongoDB Configuration
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "mrf_digitrack"

    # JWT Configuration
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)


settings = Settings()
