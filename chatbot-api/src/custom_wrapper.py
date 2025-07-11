from langchain.llms.base import LLM
from typing import List, Optional, Any
from huggingface_hub import InferenceClient
from pydantic import Field





class HuggingFaceLlamaLLM(LLM):
    model: str = Field(...)
    client: Any = None

    def __init__(self, model: str, **kwargs):
        super().__init__(model=model, **kwargs)
        self.client = InferenceClient()

    @property
    def _llm_type(self) -> str:
        return "huggingface-llama"

    def _call(self, prompt: str, stop: Optional[List[str]] = None, **kwargs) -> str:
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message["content"]

def init_llm(model_name: str) -> HuggingFaceLlamaLLM:
    return HuggingFaceLlamaLLM(model=model_name)
    
