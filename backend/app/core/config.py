import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI Wedding Planner API"
    PROJECT_VERSION: str = "0.5.0"
    
    # DATABASE
    # SERVER: str = os.getenv("DB_SERVER", "localhost")
    # DATABASE: str = os.getenv("DB_NAME", "VOWTIQUEDB")
    # DRIVER: str = os.getenv("DB_DRIVER", "ODBC Driver 17 for SQL Server")
    SQLALCHEMY_DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./wedding_planner.db")

    # SECURITY
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey_change_in_production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()
