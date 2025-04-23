import pytest
from starlette.testclient import TestClient
from api.main import app

@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.

    This fixture can be used by test functions to make requests to the API.
    """
    client = TestClient(app)
    return client
