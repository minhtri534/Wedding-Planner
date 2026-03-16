from enum import Enum
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class ConceptVibe(str, Enum):
    MODERN = "Modern"
    RUSTIC = "Rustic"
    CLASSIC = "Classic"
    LUXURY = "Luxury"
    BOHEMIAN = "Bohemian"
    MINIMALIST = "Minimalist"
    BEACH = "Beach"
    VINTAGE = "Vintage"
    GARDEN = "Garden"                                 
    INDUSTRIAL = "Industrial"
    ROMANTIC = "Romantic"

class Season(str, Enum):
    SPRING = "Spring"
    SUMMER = "Summer"
    AUTUMN = "Autumn"
    WINTER = "Winter"

class BodyShape(str, Enum):
    HOURGLASS = "Hourglass"
    PEAR = "Pear"
    RECTANGLE = "Rectangle"
    INVERTED_TRIANGLE = "Inverted Triangle"
    ROUND = "Round"

class SkinTone(str, Enum):
    FAIR_COOL = "Fair (Cool Undertone)"
    FAIR_WARM = "Fair (Warm Undertone)"
    MEDIUM_NEUTRAL = "Medium (Neutral)"
    OLIVE = "Olive"
    DARK_COOL = "Dark (Cool)"
    DARK_WARM = "Dark (Warm)"

class PriorityLevel(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class UserPreferences(BaseModel):
    total_budget: float = Field(..., description="Total available budget in USD")
    guest_count: int = Field(..., description="Number of guests")
    location: str = Field(..., description="City or Region")
    season: Season = Field(Season.SUMMER, description="Wedding Season")
    months_until_wedding: int = Field(12, description="Months remaining until the big day")
    vibe: ConceptVibe = Field(ConceptVibe.MODERN, description="Overall wedding style")
    priorities: Dict[str, PriorityLevel] = Field(..., description="User priorities per category")

class UserCreate(BaseModel):
    email: str
    password: str

class InviteRequest(BaseModel):
    vibe: ConceptVibe
    guest_count: int
    location: str
    season: Season = Season.SUMMER

class Token(BaseModel):
    access_token: str
    token_type: str

class TimelineTask(BaseModel):
    month_due: int # How many months before wedding
    task_name: str
    category: str
    is_critical: bool

class WeddingTimeline(BaseModel):
    tasks: List[TimelineTask]
    planning_velocity: str # "Relaxed", "Standard", "Aggressive"

class InviteDraft(BaseModel):
    invite_text: str
    rsvp_deadline_suggestion: str
    estimated_acceptance_rate: float


class BridalProfile(BaseModel):
    body_shape: BodyShape
    skin_tone: SkinTone
    vibe: ConceptVibe
    budget_for_dress: float

class BridalRecommendation(BaseModel):
    dress_silhouette: str
    fabric_choice: str
    neckline: str
    makeup_palette: str
    accessories_tip: str
    visual_prompt: str  # For GenAI image generation
    estimated_cost: str

class BudgetCategory(BaseModel):
    category_name: str
    allocated_amount: float
    percentage: float
    reasoning: str
    risk_factor: str

class BudgetPlan(BaseModel):
    total_budget: float
    guest_count: int
    cost_per_guest: float
    categories: List[BudgetCategory]
    contingency_fund: float
    ai_suggestions: List[str]

class ChatRequest(BaseModel):
    query: str
    context: Dict[str, Optional[str | int | float | dict | list]] = {}
