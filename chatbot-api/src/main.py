import os
from fastapi import Depends, FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict
from .gemini_app.gemini import GeminiApp
from .auth.rate_limiter import apply_rate_limit
from fastapi.middleware.cors import CORSMiddleware  

# Initialize the app
app = FastAPI()

# Pydantic Models
class ChatResponse(BaseModel):
    response: str

class ChatRequest(BaseModel):
    conversation: List[Dict[str, str]]

# AI Config
def get_system_prompt():
    try:
        with open("src/prompts/system_prompt.md", "r") as f:
            return f.read()
    except FileNotFoundError:
        raise FileNotFoundError("The file doesn't exist! Please check you're using the correct file path")

ai_system_prompt = get_system_prompt()
gemini_api_key = os.getenv("GEMINI_API_KEY")

if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

# Get the actual system response
ai_response = GeminiApp(api_key=gemini_api_key, system_prompt=ai_system_prompt)

#CORS Implementation
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sr-zqq9.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Endpoints
@app.get("/")
def root():
    return {"Server Message": "API is running"}

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: Request, chat_request: ChatRequest):
    apply_rate_limit(request)
    response_text = ai_response.chat(chat_request.conversation)
    return ChatResponse(response=response_text)