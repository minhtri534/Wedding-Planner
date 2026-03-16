from sqlalchemy.orm import Session
from . import db_models, security
from .models import UserPreferences, BudgetPlan, WeddingTimeline, InviteDraft

# --- Auth CRUD ---
def get_user_by_email(db: Session, email: str):
    return db.query(db_models.User).filter(db_models.User.email == email).first()

def create_user(db: Session, email: str, password: str):
    hashed_password = security.get_password_hash(password)
    db_user = db_models.User(email=email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Project CRUD ---
def get_latest_project(db: Session, email: str = "guest@example.com"):
    return db.query(db_models.Project).filter(db_models.Project.user_email == email).order_by(db_models.Project.id.desc()).first()

def create_project(db: Session, prefs: UserPreferences, budget_plan: dict, timeline: dict, invite: dict, user_email: str = "guest@example.com"):
    # For MVP: Create every time (snapshot), or update existing. Simplify -> Create new snapshot.
    db_project = db_models.Project(
        user_email=user_email,
        total_budget=prefs.total_budget,
        guest_count=prefs.guest_count,
        location=prefs.location,
        season=prefs.season.value,
        vibe=prefs.vibe.value,
        budget_allocation=budget_plan,
        timeline_tree=timeline,
        invite_draft=invite
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project
