from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sr-zqq9.onrender.com", "http://localhost", "http://127.0.0.1"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Server Message": "API is running"}

