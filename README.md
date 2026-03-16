# AI Wedding Planner Prototype

## Project Structure
- `frontend/`: Next.js 14 Application (React)
- `backend/`: FastAPI Python Application (Logic & AI)

## Getting Started

### 1. Backend Setup
The backend runs the Budget Algorithm and AI Logic.

```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
# source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*Server will start at http://localhost:8000*
*API Docs available at http://localhost:8000/docs*

### 2. Frontend Setup
The frontend is the user interface for the planner.

```bash
cd frontend
npm install
npm run dev
```
*App will start at http://localhost:3000*

## Features Implemented
- **Strategic Plan**: See `STRATEGIC_PLAN.md` in root.
- **Budget Engine**: Rule-based allocation algorithm in `backend/core/budget_engine.py`.
- **API**: `/planning/budget` endpoint to generate plans.
- **UI**: Interactive budget calculator in `frontend/app/page.tsx`.
