"""
Root router module.

This module defines the routes for the root endpoint of the API.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def read_root():
    """
    Root endpoint.
    
    Returns:
        dict: A simple greeting message.
    """
    return {"Hello": "Hello world"}