import pytest
from starlette.testclient import TestClient
from api.main import app

@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.

    This fixture can be used by test functions to make requests to the API.
    """
    # Create a TestClient without passing app directly to the constructor
    # This avoids the "TypeError: Client.__init__() got an unexpected keyword argument 'app'" error
    client = TestClient()
    client.app = app
    return client
