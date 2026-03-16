from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# --- DATABASE CONFIGURATION ---
# Default to SQLite for easy setup, but configured for SQL Server transition
# Uncomment and update the SQL Server section below to switch databases

# 1. SQLITE CONFIG (Currently Disabled)
# SQLALCHEMY_DATABASE_URL = "sqlite:///./wedding_planner.db"
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )

# 2. SQL SERVER CONFIG (Enabled)
# Update these constants with your actual SQL Server details
SERVER = "localhost"            # e.g., "LAPTOP-XYZ\SQLEXPRESS" or IP address
DATABASE = "VOWTIQUEDB"   # The database name you want to use
DRIVER = "ODBC Driver 17 for SQL Server" # Ensure this driver is installed on Windows

# Authentication Mode:
# Option A: Windows Authentication (Trusted Connection)
connection_string = f"mssql+pyodbc://{SERVER}/{DATABASE}?driver={DRIVER}&trusted_connection=yes"

# Option B: SQL Server Authentication (User/Password)
# If using SQL Auth, fill these in:
# USERNAME = "sa" 
# PASSWORD = "your_password_here" 

# Properly encode the password to handle special characters
# encoded_password = urllib.parse.quote_plus(PASSWORD)
# connection_string = f"mssql+pyodbc://{USERNAME}:{encoded_password}@{SERVER}/{DATABASE}?driver={DRIVER}"

# Use Option A or B based on your setup. Using Windows Auth (Option A).

engine = create_engine(connection_string)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
