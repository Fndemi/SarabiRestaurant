import os
import google.generativeai as genai
from .ai_base import AIPlatform

#
class GeminiApp(AIPlatform):
  def __init__(self, api_key:str, system_prompt: str = None):
    self.api_key = api_key
    self.system_prompt = system_prompt
    genai.configure(api_key=self.api_key)

    self.model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")

  def chat(self, conversation:list) -> str:
    messages = []
    if self.system_prompt:
      messages.append({"role": "system", "content": self.system_prompt})
      
    messages.extend(conversation)
    response = self.model.generate_content(messages)
    return response.text