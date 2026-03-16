from typing import List
from app.schemas.project import UserPreferences, TimelineTask, WeddingTimeline

class TimelineEngine:
    def generate_timeline(self, prefs: UserPreferences) -> WeddingTimeline:
        """
        Generates a dynamic checklist based on time remaining.
        compressed logic if time < 6 months.
        """
        months = prefs.months_until_wedding
        tasks = []
        velocity = "Standard"

        # Base Tasks Database
        all_tasks = [
            (12, "Venue", "Book Ceremony & Reception Venue", True),
            (12, "Budget", "Finalize Total Budget", True),
            (10, "Vendors", "Book Photographer & Videographer", True),
            (9,  "Attire", "Start Dress Shopping", True),
            (8,  "Guests", "Send Save the Dates", False),
            (8,  "Vendors", "Book Caterer", True),
            (6,  "Attire", "Order Bridesmaids Dresses", False),
            (6,  "Vendors", "Book Florist", False),
            (4,  "Guests", "Send Formal Invitations", True),
            (3,  "Attire", "First Dress Fitting", True),
            (2,  "Logistics", "Finalize Seating Chart", False),
            (1,  "Logistics", "Apply for Marriage License", True),
            (0,  "Ceremony", "Wedding Day!", True)
        ]

        if months < 6:
            velocity = "Aggressive (Compressed Schedule)"
            # Compress tasks: Everything usually due > months is now due "Now" (month_due = months)
            for due_month, cat, name, crit in all_tasks:
                if due_month > months:
                    tasks.append(TimelineTask(month_due=months, task_name=f"[URGENT] {name}", category=cat, is_critical=True))
                elif due_month <= months:
                    tasks.append(TimelineTask(month_due=due_month, task_name=name, category=cat, is_critical=crit))
        else:
            # Standard flow
            for due_month, cat, name, crit in all_tasks:
                if due_month <= months:
                    tasks.append(TimelineTask(month_due=due_month, task_name=name, category=cat, is_critical=crit))

        return WeddingTimeline(tasks=tasks, planning_velocity=velocity)
