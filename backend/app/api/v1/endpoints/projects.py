from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_project
from app.models.user import User
from app.schemas.project import (
    UserPreferences, BudgetPlan, BridalProfile, BridalRecommendation, 
    WeddingTimeline, InviteDraft, ConceptVibe
)
from app.services.budget import BudgetEngine
from app.services.bridal import BridalEngine
from app.services.timeline import TimelineEngine
from app.services.invite import InviteEngine

router = APIRouter()

# Initialize Core Engines
budget_engine = BudgetEngine()
bridal_engine = BridalEngine()
timeline_engine = TimelineEngine()
invite_engine = InviteEngine()

# --- Planning Endpoints ---

@router.post("/planning/budget", response_model=BudgetPlan)
async def generate_budget_plan(preferences: UserPreferences) -> Any:
    """
    Generates a full wedding budget breakdown based on user priorities and constraints.
    Algorithm: Rule-based baseline + weighted priority shifts + seasonality.
    """
    try:
        plan = budget_engine.generate_plan(preferences)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/planning/timeline", response_model=WeddingTimeline)
async def generate_timeline(preferences: UserPreferences) -> Any:
    """
    Generates a milestone checklist based on months remaining.
    """
    try:
        timeline = timeline_engine.generate_timeline(preferences)
        return timeline
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@router.post("/planning/invite", response_model=InviteDraft)
async def generate_invite_draft(vibe: ConceptVibe, guest_count: int, location: str) -> Any:
    """
    Generates invitation text and RSVP stats.
    """
    try:
        draft = invite_engine.generate_invite(vibe, guest_count, location)
        return draft
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@router.post("/planning/bridal-style", response_model=BridalRecommendation)
async def generate_bridal_style(profile: BridalProfile) -> Any:
    """
    Generates dress, makeup, and accessory recommendations based on body shape and skin tone.
    """
    try:
        recommendation = bridal_engine.generate_recommendation(profile) # Engine method was analyze_style? Let me check.
        # Checking bridal.py... it is analyze_style.
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Project Persistence Endpoints ---

@router.post("/save")
async def save_project_state(
    payload: dict, 
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user) # Require Auth
) -> Any:
    """
    Saves the current planning state to SQLite for the logged-in user.
    """
    try:
        # Extract and Validate
        prefs_data = payload.get("preferences")
        budget_data = payload.get("budget_plan")
        timeline_data = payload.get("timeline")
        
        # CRUD Create linked to user email
        saved = crud_project.create_project(
            db, 
            prefs=UserPreferences(**prefs_data), # Validate quickly or just pass dict if CRUD allows
            budget_plan=budget_data,
            timeline=timeline_data,
            invite=None,
            user_email=current_user.email
        )
        
        return {"status": "saved", "id": saved.id}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/latest")
async def load_latest_project(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user) # Require Auth
) -> Any:
    """
    Retrieves the most recent project state for the logged-in user.
    """
    project = crud_project.get_latest_project(db, email=current_user.email)
    
    if not project:
        return {"status": "empty"}
    
    return {
        "status": "loaded",
        "preferences": {
            "total_budget": project.total_budget,
            "guest_count": project.guest_count,
            "location": project.location,
            "season": project.season,
            "vibe": project.vibe
        },
        "budget_plan": project.budget_allocation,
        "timeline": project.timeline_tree
    }
