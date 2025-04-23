import pytest
from starlette.testclient import TestClient
from api.main import app

@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.

    This fixture can be used by test functions to make requests to the API.
    """
    # Handle both local and CI environments
    # In local environment, TestClient requires app parameter
    # In CI environment, TestClient doesn't accept app parameter in super().__init__()
    try:
        # Try the standard way first (works in local environment)
        client = TestClient(app)
    except TypeError:
        # If that fails, try the alternative way (for CI environment)
        from httpx import ASGITransport
        from starlette.types import ASGIApp

        # Create a TestClient with base_url and transport parameters
        transport = ASGITransport(app=app)
        client = TestClient(
            base_url="http://testserver",
            transport=transport
        )

    return client
