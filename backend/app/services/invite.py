from app.schemas.project import ConceptVibe, InviteDraft

class InviteEngine:
    def generate_invite(self, vibe: ConceptVibe, guest_count: int, location: str) -> InviteDraft:
        """
        Generates Invitation Copy and RSVP logic based on Vibe.
        """
        
        # 1. Tone Analysis
        if vibe == ConceptVibe.MODERN:
            copy = f"Join us for a modern celebration of love in {location}. Minimalist aesthetic, maximum joy. Black tie optional."
            deadline_offset = 4 # weeks before
        elif vibe == ConceptVibe.RUSTIC:
             copy = f"We're tying the knot under the trees! Please join us in {location} for a night of dancing, BBQ, and love under the stars."
             deadline_offset = 5
        elif vibe == ConceptVibe.LUXURY:
             copy = f"You are cordially invited to an evening of elegance in {location}. Please honor us with your presence at our black-tie affair."
             deadline_offset = 6
        else:
             copy = f"We're getting married! Come party with us in {location}."
             deadline_offset = 4

        # 2. Predictive Logic for Attendance
        # Destination weddings (implied if location is specific/far) usually have lower acceptance.
        # This is a mockheuristic.
        acceptance_rate = 0.85 # Default 85%
        if guest_count > 200:
            acceptance_rate = 0.75 # Larger weddings have more "No" RSVPs

        return InviteDraft(
            invite_text=copy,
            rsvp_deadline_suggestion=f"{deadline_offset} weeks before the date",
            estimated_acceptance_rate=round(acceptance_rate * 100, 1)
        )
