import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI HR Manager"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "hr_user")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "hr_password")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "db")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "hr_manager")
    DATABASE_URL: Optional[str] = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://mongodb:27017")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379")
    CHROMADB_HOST: str = os.getenv("CHROMADB_HOST", "chromadb")
    CHROMADB_PORT: int = int(os.getenv("CHROMADB_PORT", 8000))

    GOOGLE_API_KEY: Optional[str] = os.getenv("GOOGLE_API_KEY")

    class Config:
        case_sensitive = True

settings = Settings()
