from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.services.chat import ChatEngine

router = APIRouter()
chat_engine = ChatEngine()

class ChatRequest(BaseModel):
    query: str
    context: Dict[str, Any]  # Passes current state: budget, guests, etc.

@router.post("/query")
async def chat_with_planner(request: ChatRequest):
    try:
        response = chat_engine.process_query(request.query, request.context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))