"""
Main application module.

This module initializes the FastAPI application and includes all routers.
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import cardio, prediction, root

# Initialize FastAPI app
app = FastAPI(
    title="Heart-AI API",
    description="API for Heart-AI application",
    debug=os.getenv("DEBUG", "False").lower() in ("true", "1", "t"),
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(root.router)
app.include_router(cardio.router)
app.include_router(prediction.router)
