from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.models import (
    UserPreferences, BudgetPlan, BridalProfile, BridalRecommendation, 
    WeddingTimeline, InviteDraft, ConceptVibe, InviteRequest, Season,
    ChatRequest
)
from core.budget_engine import BudgetEngine
from core.bridal_engine import BridalEngine
from core.timeline_engine import TimelineEngine
from core.invite_engine import InviteEngine
from core.chat_engine import ChatEngine
from core.database import engine, SessionLocal, Base, get_db
from core import db_models, crud
from sqlalchemy.orm import Session
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from core.models import UserCreate, Token
from core.security import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM
from datetime import timedelta
from jose import jwt, JWTError

# Initialize Database Tables
db_models.Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AI Wedding Planner API",
    description="Backend logic for Financially Intelligent Wedding Platform",
    version="0.5.0 (Authentication Added)"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Core Engines
budget_engine = BudgetEngine()
bridal_engine = BridalEngine()
timeline_engine = TimelineEngine()
invite_engine = InviteEngine()
chat_engine = ChatEngine()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
async def health_check():
    return {"status": "ok", "message": "AI Wedding Planner V5 (Auth) is running"}

# ==========================================
# Authentication Endpoints
# ==========================================

@app.post("/auth/register", response_model=Token)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    crud.create_user(db, email=user.email, password=user.password)
    
    # Auto-login after register
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/planning/budget", response_model=BudgetPlan)
async def generate_budget_plan(preferences: UserPreferences):
    """
    Generates a full wedding budget breakdown based on user priorities and constraints.
    Algorithm: Rule-based baseline + weighted priority shifts + seasonality.
    """
    try:
        plan = budget_engine.generate_plan(preferences)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/planning/timeline", response_model=WeddingTimeline)
async def generate_timeline(preferences: UserPreferences):
    """
    Generates a milestone checklist based on months remaining.
    """
    try:
        timeline = timeline_engine.generate_timeline(preferences)
        return timeline
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@app.post("/planning/invite", response_model=InviteDraft)
async def generate_invite_draft(request: InviteRequest):
    """
    Generates invitation text and RSVP stats.
    """
    try:
        draft = invite_engine.generate_invite(request)
        return draft
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/query")
async def chat_with_planner(request: ChatRequest):
    """
    Context-aware AI Chat assistant.
    Returns string response.
    """
    try:
        response = chat_engine.process_query(request.query, request.context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/planning/bridal-style", response_model=BridalRecommendation)
async def generate_bridal_style(profile: BridalProfile):
    """
    Generates dress, makeup, and accessory recommendations based on body shape and skin tone.
    """
    try:
        recommendation = bridal_engine.generate_recommendation(profile)
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================
# Database Persistence Layer
# ==========================================

@app.post("/project/save")
async def save_project_state(
    payload: dict, 
    db: Session = Depends(get_db),
    current_user: db_models.User = Depends(get_current_user) # Require Auth
):
    """
    Saves the current planning state to SQLite for the logged-in user.
    """
    try:
        # Extract and Validate
        prefs_data = payload.get("preferences")
        budget_data = payload.get("budget_plan")
        timeline_data = payload.get("timeline")
        
        # CRUD Create linked to user email
        saved = crud.create_project(
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

@app.get("/project/latest")
async def load_latest_project(
    db: Session = Depends(get_db),
    current_user: db_models.User = Depends(get_current_user) # Require Auth
):
    """
    Retrieves the most recent project state for the logged-in user.
    """
    project = crud.get_latest_project(db, email=current_user.email)
    
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
