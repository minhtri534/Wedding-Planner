from .models import ConceptVibe, InviteDraft, InviteRequest, Season

class InviteEngine:
    def generate_invite(self, request: InviteRequest) -> InviteDraft:
        """
        Generates Invitation Copy and RSVP logic based on Vibe using the InviteRequest model.
        """
        
        vibe = request.vibe
        location = request.location
        guest_count = request.guest_count
        season = request.season

        # 1. Tone Analysis
        if vibe == ConceptVibe.MODERN:
            season_text = "warm" if season in [Season.SUMMER, Season.SPRING] else "cozy"
            copy = f"Join us for a modern celebration of love in {location}. Minimalist aesthetic, {season_text} vibes, maximum joy. Black tie optional."
            deadline_offset = 4
        elif vibe == ConceptVibe.RUSTIC:
             activity = "dancing under the stars" if season == Season.SUMMER else "hot cocoa by the fire"
             copy = f"We're tying the knot! Please join us in {location} for a rustic evening of love and {activity}."
             deadline_offset = 5
        elif vibe == ConceptVibe.LUXURY:
             copy = f"You are cordially invited to an evening of elegance in {location}. Please honor us with your presence at our black-tie affair this {season.value}."
             deadline_offset = 6
        else:
             copy = f"We're getting married! Come party with us in {location}."
             deadline_offset = 4

        # 2. Predictive Logic for Attendance
        acceptance_rate = 0.85 # Default 85%
        
        # Factor: Guest Count
        if guest_count > 200:
            acceptance_rate -= 0.10 # Larger weddings have more "No" RSVPs
        elif guest_count < 50:
            acceptance_rate += 0.10 # Intimate weddings have higher attendance

        # Factor: Season/Destination heuristic (Mock)
        if season == Season.WINTER and location.lower() not in ["miami", "hawaii", "cancun"]:
             acceptance_rate -= 0.05 # Weather travel issues
        
        if "destination" in location.lower() or location.lower() in ["hawaii", "italy", "france", "bali"]:
            acceptance_rate -= 0.15 # Destination drop-off

        return InviteDraft(
            invite_text=copy,
            rsvp_deadline_suggestion=f"{deadline_offset} weeks before the date",
            estimated_acceptance_rate=round(max(0.1, min(acceptance_rate, 1.0)) * 100, 1)
        )
