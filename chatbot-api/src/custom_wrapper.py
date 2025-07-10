from langchain.llms.base import LLM
from typing import List, Optional, Any
from huggingface_hub import InferenceClient
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory


memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    output_key="answer"
)


class HuggingFaceLlamaLLM(LLM):
    model: str
    client: Any = None

    def __init__(self, **data):
        super().__init__(**data)
        self.client = InferenceClient()
    
    @property
    def _llm_type(self) -> str:
        return "huggingface-llama"

    def _call(self, prompt: str, stop: Optional[List[str]] = None, **kwargs) -> str:
        # Get chat history from kwargs (as a list of messages)
        chat_history = kwargs.get("chat_history", [])
        # Format the chat history into a string
        history_str = ""
        for msg in chat_history:
            role = "User" if msg.type == "human" else "AI"
            history_str += f"{role}: {msg.content}\n"
        # Prompt template with explicit instructions
        full_prompt = (
            "The following is a conversation between a user and an AI assistant. "
            "Use the conversation history to answer the latest question as helpfully as possible.\n"
            f"{history_str}"
            f"User: {prompt}\n"
            "AI:"
        )
        # Send as a single message to the model
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": full_prompt}]
        )
        return completion.choices[0].message["content"]
    
# Defining the VectorStore
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma(
 persist_directory="chroma_db",
     embedding_function=embedding_model
 )


# Usage in LangChain
llm = HuggingFaceLlamaLLM(model="salesforce/Llama-xLAM-2-8b-fc-r")

# Example: using with a RetrievalQA chain
from langchain.chains import RetrievalQA

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    memory=memory,
    return_source_documents=True,
    output_key = "answer"
)


response = qa_chain.invoke({"question":"What hours are you open?"})
print(response['answer'])

response = qa_chain.invoke({"question":"I am the developer building a chatbot and I'm trying to confirm memeory is working. So, what did I just ask you?"})
print(response["answer"])

# Print each message in the chat history as text
for msg in memory.load_memory_variables({})["chat_history"]:
    print(f"{msg.type}: {msg.content}")