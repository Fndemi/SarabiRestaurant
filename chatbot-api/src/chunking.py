from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.vectorstores import Chroma

embeding_model = HuggingFaceBgeEmbeddings(
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
)

with open("prompts/system_prompt.md", "r") as f:
    markdown_content = f.read()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
docs = text_splitter.create_documents([markdown_content])



vectorstore = Chroma.from_documents(
    documents=docs,
    embedding = embeding_model,
    persist_directory="chroma_db"

)

vectorstore.persist()

print(f"Stored {len(docs)} chunks in Chroma DB.")