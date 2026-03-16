from .models import BridalProfile, BridalRecommendation, BodyShape, SkinTone, ConceptVibe

class BridalEngine:
    def analyze_style(self, profile: BridalProfile) -> BridalRecommendation:
        """
        Expert System Logic for Bridal Styling.
        Maps Body Shape + Skin Tone + Vibe + Budget -> Fashion Recommendations.
        """
        
        # 1. Dress Silhouette Logic (Body Shape)
        silhouette_map = {
            "Hourglass": "Mermaid or Trumpet",
            "Pear": "A-Line or Ballgown",
            "Rectangle": "Sheath or Empire Waist",
            "Inverted Triangle": "Full Skirt / Ballgown (to balance shoulders)",
            "Round": "Empire Waist or A-Line"
        }
        silhouette = silhouette_map.get(str(profile.body_shape), "Custom Tailored")

        # 2. Fabric & Neckline (Vibe) - EXPANDED LOGIC
        vibe_str = str(profile.vibe)
        if vibe_str == "Bohemian":
            fabric = "Chantilly Lace & Flowy Chiffon"
            neckline = "Off-the-shoulder or V-neck"
        elif vibe_str == "Modern":
            fabric = "Crepe or Silk Mikado (Clean lines)"
            neckline = "Asymmetric or Square"
        elif vibe_str == "Luxury":
            fabric = "Satin with Crystal Embellishments"
            neckline = "Plunging V or High Neck Illusion"
        elif vibe_str == "Beach":
            fabric = "Lightweight Chiffon or Organza (Breathable)"
            neckline = "Spaghetti Strap or Backless"
        elif vibe_str == "Vintage":
            fabric = "Silk Charmeuse or Heavy Lace"
            neckline = "High Neck or Cap Sleeves"
        elif vibe_str == "Garden":
            fabric = "Tulle with Floral Appliqués"
            neckline = "Sweetheart or Illusion"
        elif vibe_str == "Industrial":
            fabric = "Architectural Satin or Metallic Threading"
            neckline = "Deep V or Halter"
        elif vibe_str == "Rustic":
            fabric = "Cotton Lace or Linen Blend"
            neckline = "Modest Scoop or Boat Neck"
        elif vibe_str == "Romantic":
            fabric = "Soft Tulle & layered organza"
            neckline = "Sweetheart or Off-shoulder"
        else: # Classic / Minimalist / Default
            fabric = "Satin or Taffeta"
            neckline = "Strapless or Bateau"

        # 3. Budget Consideration
        budget = profile.budget_for_dress
        if budget < 1000:
            tier = "Budget-Friendly (Consider Sample Sales or Pre-loved)"
        elif budget < 3000:
            tier = "Mid-Range Designer (Boutique Collections)"
        else:
            tier = "Luxury Designer / Custom Couture"

        estimated_cost = f"${budget:,.0f} Range - {tier}"

        # 4. Color Palette (Skin Tone)
        if "Cool" in str(profile.skin_tone):
            palette = "Pure White or Silver/Blue undertones"
        elif "Warm" in str(profile.skin_tone):
            palette = "Ivory, Champagne, or Blush"
        else:
            palette = "Natural White or Cream"

        return BridalRecommendation(
            dress_silhouette=silhouette,
            fabric_choice=fabric,
            neckline=neckline,
            makeup_palette=palette,
            accessories_tip=f"Best for {vibe_str}: {self._get_accessories(vibe_str)}",
            visual_prompt=f"A {vibe_str} wedding dress, {silhouette} silhouette, {fabric}, {neckline} neckline, isolated on white background, 8k resolution.",
            estimated_cost=estimated_cost
        )

    def _get_accessories(self, vibe: str) -> str:
        mapping = {
            "Modern": "Geometric earrings, no necklace, sleek veil",
            "Bohemian": "Flower crown or vine, layered bracelets",
            "Luxury": "Diamond drop earrings, cathedral veil, tiara",
            "Beach": "Pearl studs, barefoot sandals, loose waves",
            "Vintage": "Birdcage veil, pearl strand, red lip",
            "Garden": "Fresh floral hairpiece, dainty pendant",
            "Industrial": "Bold metallic cuff, modern ear climber",
            "Rustic": "Cowboy boots (optional), simple gold hoop",
            "Romantic": "Crystal hair vine, rose gold jewelry",
            "Classic": "Pearl earrings, mid-length veil",
            "Minimalist": "Small studs, simple hair ribbon"
        }
        return mapping.get(vibe, "Classic jewelry")
