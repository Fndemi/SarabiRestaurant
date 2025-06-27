import os
from fastapi import Depends, FastAPI
from pydantic import BaseModel



# Initialize the app
app = FastAPI()

# Pydantic Models
class ChatResponse(BaseModel):
  response: str

class ChatRequest(BaseModel):
  prompt: str


# AI Config

def get_system_prompt():
  try:
    with open("src/prompts/system_prompt.md", "r") as f:
      return f.read()
  except FileNotFoundError:
    raise FileNotFoundError("The file doesn't exist! Please check you're using the correct file path")

ai_system_prompt = get_system_prompt()
gemini_api_key=os.getenv("GEMINI_API_KEY")

if not gemini_api_key:
  raise ValueError("GEMINI_API_KEY environment variable not set.")

