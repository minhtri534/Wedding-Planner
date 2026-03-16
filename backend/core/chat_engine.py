from typing import Dict, List, Optional
from .models import ConceptVibe, Season

class ChatEngine:
    def process_query(self, query: str, context: Dict) -> str:
        """
        Process user query with context-awareness (Budget, Vibe, Guests, etc.)
        Returns a helpful response based on the project data.
        """
        query = query.lower()
        budget = context.get("budget", 0) or 0
        guests = context.get("guests", 0) or 0
        vibe = context.get("vibe", "Modern") or "Modern"
        location = context.get("location", "Unknown") or "Unknown"
        season = context.get("season", "Summer") or "Summer"

        # 1. Budget Queries
        if "budget" in query or "cost" in query or "afford" in query:
            if "dress" in query:
                return f"With a total budget of ${budget:,.0f}, I recommend allocating around ${budget * 0.08:,.0f} for your bridal look. This fits well for a {vibe} style."
            if "venue" in query:
                return f"For a {vibe} wedding in {location}, venue & catering usually take 40-50% of the budget. You should plan for about ${budget * 0.45:,.0f}."
            if "flowers" in query or "decor" in query:
                return f"For a {season} wedding, floral costs can vary. I'd suggest allocating roughly ${budget * 0.10:,.0f} for decor to match your {vibe} theme."
            return f"Your total budget is ${budget:,.0f} for {guests} guests. That's about ${budget/guests if guests else 0:,.0f} per guest, which is a {self._get_budget_tier(budget, guests)} budget."

        # 2. Vibe/Style Queries
        if "vibe" in query or "style" in query or "theme" in query or "color" in query:
            if "color" in query:
                return self._get_color_palette(vibe, season)
            return f"Your {vibe} theme is perfect for {season}. Think '{self._get_vibe_keywords(vibe)}' for your overall atmosphere."

        # 3. Guest/Invite Queries
        if "guest" in query or "invite" in query or "rsvp" in query:
            if "when" in query:
                return f"For a {season} wedding, send Save the Dates 6-8 months in advance, and formal invites 8 weeks before the big day."
            return f"With {guests} guests, you'll need about {int(guests * 0.6)} invitations (assuming couples/families). I can help draft them in the 'Guests' tab!"

        # 4. General Wedding Advice (Fallback)
        return self._get_fallback_response(query)

    def _get_budget_tier(self, budget, guests):
        cpp = budget / guests if guests else 0
        if cpp < 200: return "tight but manageable"
        if cpp < 500: return "comfortable"
        return "luxury"

    def _get_color_palette(self, vibe, season):
        # Simple heuristic for colors
        if vibe == "Beach": return "Soft Blues, Sandy Beige, and Coral accents."
        if vibe == "Rustic": return "Terracotta, Sage Green, and Wood tones."
        if vibe == "Modern": return "Monochrome Black & White with Emerald Green."
        if vibe == "Garden": return "Pastel Pink, Lavender, and Fresh Green."
        if vibe == "Vintage": return "Dusty Rose, Gold, and Cream."
        if season == "Autumn": return "Deep Burnt Orange, Mustard, and Burgundy."
        if season == "Winter": return "Navy Blue, Silver, and White."
        return "Classic White, Champagne, and Gold."

    def _get_vibe_keywords(self, vibe):
        keywords = {
            "Modern": "Clean lines, Minimalist, Chic",
            "Rustic": "Warm, Cozy, Natural",
            "Bohemian": "Free-spirited, Flowy, Eclectic",
            "Luxury": "Opulent, Grand, Sparkly",
            "Beach": "Breezy, Relaxed, Oceanic",
            "Garden": "Floral, Romantic, Whimsical",
            "Vintage": "Timeless, Retro, Nostalgic",
            "Industrial": "Edgy, Raw, Urban",
            "Romantic": "Soft, Dreamy, Intimate"
        }
        return keywords.get(vibe, "Beautiful, Memorable, Unique")

    def _get_fallback_response(self, query):
        responses = [
            "That's a great question! I'd recommend focusing on your top 3 priorities first.",
            "I can help you adjust your budget or find style ideas. Try asking about 'flowers' or 'dress budget'.",
            "Planning can be overwhelming, but you're doing great! Check the Timeline tab to stay on track.",
            "Could you be more specific? I can help with Budget, Style, or Guests."
        ]
        import random
        return random.choice(responses)
