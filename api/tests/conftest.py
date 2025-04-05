import pytest
from fastapi.testclient import TestClient
from api.main import app

@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.
    
    This fixture can be used by test functions to make requests to the API.
    """
    return TestClient(app)