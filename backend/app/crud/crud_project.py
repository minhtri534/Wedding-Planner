from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import UserPreferences

def get_latest_project(db: Session, email: str = "guest@example.com"):
    return db.query(Project).filter(Project.user_email == email).order_by(Project.id.desc()).first()

def create_project(db: Session, prefs: UserPreferences, budget_plan: dict, timeline: dict, invite: dict, user_email: str = "guest@example.com"):
    # For MVP: Create every time (snapshot), or update existing. Simplify -> Create new snapshot.
    db_project = Project(
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
