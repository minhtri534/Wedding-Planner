# AI Wedding Platform - Strategic Master Plan

## 1. Executive Summary & Brand Strategy (Startup Strategist)

### **Pitch Narrative**
The wedding industry is built on opacity and emotional pressure, leading to "Wedding Inflation" where couples overspend by an average of 30%. Traditional planners are expensive luxuries ($3k+), and existing apps are merely glorified spreadsheets without intelligence.

**Differentiation:** We are the first **"Financially Intelligent Wedding Platform."** We don't just list tasks; we mathematically optimize the wedding budget against the couple's desires using AI, democratizing high-end wedding strategy for the budget-conscious generation.

**Tagline:** "Your Wedding, Financially Mastered." / "Intelligent Planning. Beautifully Executed."

### **Brand Manifesto**
Love is emotional; planning should be rational. We believe every couple deserves a dream wedding without the financial nightmare. We bring the clarity of a CFO and the eye of a Designer to your big day. We are the calm in the chaos.

### **Elevator Pitch (30s)**
"We are building the 'Mint.com meets Vogue' for weddings. It’s an AI-powered platform that takes a couple’s hard budget and prioritizes it against their actual desires—instantly generating a feasibility plan, vendor allocation, and timeline. While competitors just let you list expenses, we actively optimize them. We’re targeting the $72B wedding market with a scalable, calm, and financially transparent SaaS solution."

---

## 2. Product Architecture & UX (Product Designer)

### **Sitemap Structure**
1.  **Public Facing**
    *   Landing Page
    *   "How it Works" (The AI Brain)
    *   Pricing
    *   Resources/Blog (SEO)
2.  **Auth Layer**
    *   Sign Up / Login
    *   Onboarding Wizard (The "Deep Dive" Questionnaire)
3.  **App Core (Dashboard)**
    *   **Control Center:** High-level timeline, budget health, urgent tasks.
    *   **AI Planner Module (MVP Priority):**
        *   Budget Scenario Builder
        *   Vendor Allocator
        *   Timeline Manager
    *   **Bridal AI Studio:**
        *   Avatar Generator
        *   Dress/Makeup Trial
    *   **Guest & Invite Operations:**
        *   Digital Invites
        *   RSVP Tracker
        *   Seating Chart AI
    *   **Marketplace (Future):** Vendor matching.

### **UX Flow: Landing to Onboarding**
1.  **Hook:** "Stop guessing. Start calculating." (Input total budget on homepage).
2.  **Validation:** Instant graph showing "What $30k gets you in [City]."
3.  **Sign Up:** "Save this plan."
4.  **Onboarding (The Intelligence Layer):**
    *   *Input:* Budget, Date, Guest Count, Location.
    *   *Priorities:* User drags sliders for what matters (Food vs. Photos vs. Dress).
    *   *Vibe:* Select visual mood board images.
5.  **The "Magic Moment":** System generates a fully fleshed-out budget breakdown and timeline instantly.

---

## 3. UI Design System (Senior UI Designer)

**Style Inspiration:** Apple (Cleanliness) + Notion (Utility) + Zola (Function) + Airbnb (Warmth).

### **Visual Identity**
*   **Tone:** Premium, Unisex, Intelligent.
*   **Color Palette:**
    *   *Primary:* **Deep Slate Blue** (Trust, Tech, Intelligence)
    *   *Secondary:* **Warm Sand / Champagne** (Wedding warmth, elegance)
    *   *Accent:* **Soft Sage Green** (Financial health, calmness)
    *   *Functional:* **Signal Red** (Over-budget alerts - soft tone)
*   **Typography:**
    *   *Headings:* **Inter Tight** or **Playfair Display** (Editorial but modern).
    *   *Body:* **Inter** or **DM Sans** (Clean, legible, tech-native).

### **Component Library**
*   **Cards:** "Glassmorphism" effect with soft shadows. White background, high border-radius (12px).
*   **Buttons:**
    *   *Primary:* Solid Slate Blue, pill-shaped.
    *   *Secondary:* Thin outline, Champagne text.
*   **Data Viz:** Donut charts for budget; Gantt charts for timeline. Minimalist lines.
*   **Micro-interactions:**
    *   *Budget Slider:* Haptic feedback visual (slight grow) when moving.
    *   *Completion:* Subtle confetti or "check mark" bloom animation.

---

## 4. Copywriting Strategy (SaaS Copywriter)

<!-- Homepage Copy Draft -->

### **Hero Section**
**Headline:** "Plan a Masterpiece. Stay in the Green."
**Subhead:** The first AI wedding planner that engineers your dream day around your *real* budget. No spreadsheets, no stress, just smart decisions.
**CTA:** [Start Your Free Budget Analysis]  *(No credit card required)*

### **Problem Section**
**Headline:** "Why is 'Wedding math' so hard?"
**Copy:** Traditional planning is a guessing game. You book a venue, then run out of money for the dress. We reverse the process. Tell us what you can spend, and we’ll tell you *how* to spend it to get exactly what you want.

### **Solution Section**
**Headline:** "Meet your CFO and Art Director."
**Features:**
*   **Budget First:** We allocate funds based on your priorities (e.g., "Heavy on photos, light on flowers").
*   **Visual Logic:** See how budget changes look in 3D before you spend a dime.
*   **Automated Timeline:** A dynamic schedule that adapts if you miss a deadline.

### **Social Proof**
"I saved $4,000 just by using the AI vendor allocation tool." - *Sarah & Mike, NYC*

---

## 5. Technical Architecture (AI Engineer)

### **Module 1: AI Wedding Planner Logic (Priority for MVP)**
This is not just a calculator; it is an optimization engine.

**Inputs:**
*   Total Budget ($)
*   Guest Count (N)
*   Location (Geo-factor)
*   Priorities (Weighted Array: `[Venue: 0.9, Food: 0.7, Decor: 0.4]`)

**Logic Framework (Rule-Based + LLM):**
1.  **Baseline Calculation:** Use industry standard ratios (Venue 40%, Food 30%) as a starting point.
2.  **Geo-Adjustment:** Apply `LocationMultiplier` based on zip code density.
3.  **Priority Redistribution:** If User prioritizes "Photography" (Weight 0.9), algorithm cannibalizes budget from "Decor" (Weight 0.4) to boost Photo budget.
4.  **LLM Reasoning (GPT-5.2/Emergent):**
    *   *Prompt:* "User wants a 'Forest Fairy' vibe in Seattle for $30k/100pax. Adjust categories."
    *   *Output:* Suggests specific tradeoffs: "Switch from plated dinner to stylized buffet to afford the forest lighting rig."

### **Module 2: AI Bridal Assistant (Computer Vision)**
*   **Skin Tone:** HSV histograms + k-means clustering on user selfie to determine seasonal color palette (Winter/Summer).
*   **Body Type:** Pose estimation (MediaPipe) to detect shoulder-to-hip ratios.
*   **GenAI Visualization:** Stable Diffusion / Midjourney API pipeline.
    *   *Prompt Engineering:* "Wedding dress, [Silhouette], on [Skin Tone] model, in [Venue Type] lighting."

---

## 6. Pricing & Business Model (Behavioral Economist)

**Goal:** Reduce "Financial Anxiety" to increase conversion.

### **Pricing Tiers**

| Tier | Price | User Psychology | Features |
| :--- | :--- | :--- | :--- |
| **The Planner (Free)** | $0 | **"Safety"** | Basic Budget Calculator, Checklist, Guest List. "See what's possible." |
| **Intelligent Control** | $19/mo | **"Empowerment"** | **Dynamic AI Budget Re-allocation**, Priority Engine, Unlimited Scenarios. |
| **Bridal Suite** | $29/mo | **"Visualization"** | All Control features + **AI Dress Try-on**, 3D Avatar, Venue Visualizer. |
| **Lifetime Access** | $199 | **"Commitment"** | One-time fee for 12 months access. Best for "Gifted" subscriptions. |

**Add-on Strategy:**
*   **Marketplace Commission:** 5-10% from vendors booked through the platform (Future).
*   **Printed Stationery:** Upsell on the beautiful designs created in the invite module.

### **Nudges & Triggers**
*   **Anchoring:** Show the "Average Cost" of a wedding in their area ($45k) next to their "Optimized Plan" ($35k) to show immediate value.
*   **Progress Bars:** "Your wedding is 42% planned." Creates a need for completion.
*   **Negative Reinforcement Prevention:** Instead of red "Over Budget" warnings, use orange "Trade-off Required" alerts with solutions.

---

## 7. Next Steps: MVP Implementation

**Focus:** **AI Wedding Planner (Budget & Timeline Ops)**.
**Tech Stack:** Next.js (React), Python (FastAPI for logic), OpenAI API.

1.  Set up Next.js Workspace.
2.  Build "Onboarding Questionnaire" (Data Collection).
3.  Implement "Budget Engine v1" (Rule-based Python logic).
4.  Connect OpenAI to generate "Savings Recommendations" based on budget output.
