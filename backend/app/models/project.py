from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, JSON
from app.db.base_class import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), ForeignKey("users.email"), index=True, default="guest@example.com") # Linked to User
    
    # Core Preferences
    total_budget = Column(Float)
    guest_count = Column(Integer)
    location = Column(String)
    season = Column(String)
    vibe = Column(String)
    
    # Saved Computed Data (Storing rich objects as JSON for MVP simplicity)
    budget_allocation = Column(JSON, nullable=True)
    timeline_tree = Column(JSON, nullable=True)
    invite_draft = Column(JSON, nullable=True)
    bridal_recs = Column(JSON, nullable=True)

    is_active = Column(Boolean, default=True)
