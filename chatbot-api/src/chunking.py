from langchain.text_splitter import RecursiveCharacterTextSplitter

with open("prompts/system_prompt.md", "r") as f:
    markdown_content = f.read()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
docs = text_splitter.create_documents([markdown_content])

print(docs[3])