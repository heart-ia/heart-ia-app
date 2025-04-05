import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables based on environment
env_mode = os.getenv("ENV_MODE", "development")
env_file = f".env.{env_mode}"

# Load .env file first (common variables)
load_dotenv()

# Load environment-specific variables
if os.path.exists(env_file):
    load_dotenv(env_file)

# Create FastAPI app
app = FastAPI(
    title="Heart-AI API",
    description="API for Heart-AI application",
    debug=os.getenv("DEBUG", "False").lower() in ("true", "1", "t"),
)

# Get CORS origins from environment variable
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
origins = cors_origins.split(",")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
def read_root():
    return {"Hello": "Hello world"}
