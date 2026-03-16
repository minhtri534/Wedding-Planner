import math
from typing import Dict, List
from app.schemas.project import UserPreferences, BudgetPlan, BudgetCategory, PriorityLevel, ConceptVibe, Season

# Industry Standard Baselines (Approximate percentages)
STANDARD_ALLOCATION = {
    "Venue & Catering": 0.45,
    "Photography & Video": 0.12,
    "Attire & Beauty": 0.08,
    "Decor & Florals": 0.10,
    "Entertainment": 0.08,
    "Planner/Coordinator": 0.05,
    "Stationery": 0.03,
    "Transportation": 0.02,
    "Gifts & Favors": 0.02,
    "Miscellaneous": 0.05
}

class BudgetEngine:
    def __init__(self):
        pass

    def _apply_seasonality(self, allocation: Dict[str, float], season: Season) -> Dict[str, float]:
        """
        Adjusts costs based on Wedding Season.
        Summer/Autumn = Peak Season (Higher Venue/Floral costs).
        """
        if season in [Season.SUMMER, Season.AUTUMN]:
            # Peak season premium
            allocation["Venue & Catering"] += 0.03
            allocation["Decor & Florals"] += 0.02 # Flowers are in demand
            # Reduce others to compensate
            allocation["Miscellaneous"] -= 0.03
            allocation["Attire & Beauty"] -= 0.02
        return allocation

    def _adjust_for_guest_count(self, allocation: Dict[str, float], guest_count: int, total_budget: float) -> Dict[str, float]:
        """
        Adjusts Venue & Catering based on guest count density.
        High guest count eats into other categories if budget is tight.
        """
        # Simple heuristic: If cost per guest is low, boost catering share.
        cost_per_guest = total_budget / guest_count if guest_count > 0 else 0
        
        # If budget is tight (<$100/person), Catering needs more % of the pie
        if cost_per_guest < 100:
            allocation["Venue & Catering"] += 0.05
            # Reduce variable costs to compensate
            allocation["Decor & Florals"] -= 0.02
            allocation["Attire & Beauty"] -= 0.01
            allocation["Miscellaneous"] -= 0.02
            
        return allocation

    def _apply_priorities(self, allocation: Dict[str, float], priorities: Dict[str, PriorityLevel]) -> Dict[str, float]:
        """
        Redistributes budget based on user priorities using a weighted shift.
        """
        # Define multipliers
        multipliers = {
            PriorityLevel.HIGH: 1.3,   # +30%
            PriorityLevel.MEDIUM: 1.0, # No change
            PriorityLevel.LOW: 0.7     # -30%
        }

        # 1. Apply multipliers to get raw new weights
        current_total_weight = 0
        temp_allocation = {}
        
        for category, base_pct in allocation.items():
            # Default to MEDIUM if not specified
            priority = priorities.get(category, PriorityLevel.MEDIUM)
            mult = multipliers[priority]
            
            new_share = base_pct * mult
            temp_allocation[category] = new_share
            current_total_weight += new_share

        # 2. Normalize back to 1.0 (100%)
        final_allocation = {}
        for cat, raw_share in temp_allocation.items():
            final_allocation[cat] = raw_share / current_total_weight

        return final_allocation

    def generate_plan(self, prefs: UserPreferences) -> BudgetPlan:
        # 1. Start with baseline
        current_alloc = STANDARD_ALLOCATION.copy()
        
        # 2. Apply Seasonality (New V2 Feature)
        current_alloc = self._apply_seasonality(current_alloc, prefs.season)

        # 3. Adjust for Guest Count constraint
        current_alloc = self._adjust_for_guest_count(current_alloc, prefs.guest_count, prefs.total_budget)
        
        # 4. Apply Priorities
        current_alloc = self._apply_priorities(current_alloc, prefs.priorities)

        # 5. Construct Output
        categories = []
        contingency_pct = 0.05 # Reserve 5% explicitly
        
        # Adjust total budget for contingency
        actionable_budget = prefs.total_budget * (1.0 - contingency_pct)
        contingency_amount = prefs.total_budget * contingency_pct

        for cat, pct in current_alloc.items():
            amount = actionable_budget * pct
            
            # Simple rule-based reasoning for MVP
            reasoning = "Standard allocation."
            if pct > STANDARD_ALLOCATION.get(cat, 0) + 0.02:
                reasoning = "Increased due to High Priority or Seasonality."
                
            risk = "Low"
            if cat == "Venue & Catering" and (amount / prefs.guest_count) < 50:
                risk = "High Risk: Very low cost per head."
            
            categories.append(BudgetCategory(
                category_name=cat,
                allocated_amount=round(amount, 2),
                percentage=round(pct * 100, 1),
                reasoning=reasoning,
                risk_factor=risk
            ))

        ai_suggestions = [
            f"With {prefs.guest_count} guests in {prefs.season}, ensure your venue has climate control.",
        ]

        
        # Basic Vibe logic
        if prefs.vibe == ConceptVibe.RUSTIC:
             ai_suggestions.append("Look for barn venues or public parks to align with Rustic vibe.")
        elif prefs.vibe == ConceptVibe.LUXURY:
             ai_suggestions.append("Prioritize 'Guest Experience' items like Valet and Top-shelf Bar.")

        return BudgetPlan(
            total_budget=prefs.total_budget,
            guest_count=prefs.guest_count,
            cost_per_guest=round(prefs.total_budget / prefs.guest_count, 2),
            categories=categories,
            contingency_fund=round(contingency_amount, 2),
            ai_suggestions=ai_suggestions
        )
