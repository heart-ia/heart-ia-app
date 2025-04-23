"""
Tests for the prediction router.

This module contains tests for the prediction router.
"""

import pytest
from unittest.mock import patch, MagicMock
from starlette.testclient import TestClient

from api.main import app
from api.services.prediction_service import InputData, UserInputData, PredictionService, CholesterolLevel


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
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


@pytest.fixture
def mock_prediction_service():
    """Mock the prediction service."""
    with patch("api.routers.prediction.PredictionService") as mock_service_class:
        # Create a mock instance
        mock_service = MagicMock()

        # Configure the mock instance's predict method
        mock_service.predict.return_value = {
            "probabilité": 0.7,
            "prédiction": 1
        }

        # Configure the mock class to return the mock instance
        mock_service_class.return_value = mock_service

        yield mock_service


def test_predict_endpoint_valid_input(client, mock_prediction_service):
    """Test the prediction endpoint with valid input."""
    # Create valid input data
    input_data = {"features": [1.0, 2.0, 3.0, 4.0, 5.0]}

    # Make a POST request to the prediction endpoint
    response = client.post("/prediction/", json=input_data)

    # Check response status code
    assert response.status_code == 200

    # Check response content
    assert response.json() == {
        "probabilité": 0.7,
        "prédiction": 1
    }

    # Verify the prediction service was called with the correct input
    mock_prediction_service.predict.assert_called_once()
    call_args = mock_prediction_service.predict.call_args[0][0]
    assert isinstance(call_args, InputData)
    assert call_args.features == input_data["features"]


def test_predict_endpoint_invalid_input(client, mock_prediction_service):
    """Test the prediction endpoint with invalid input."""
    # Configure the mock to raise a ValueError
    mock_prediction_service.predict.side_effect = ValueError("Invalid input data")

    # Create invalid input data
    input_data = {"features": []}

    # Make a POST request to the prediction endpoint
    response = client.post("/prediction/", json=input_data)

    # Check response status code
    assert response.status_code == 400

    # Check response content
    assert "Invalid input data" in response.json()["detail"]


def test_prediction_service_initialization_error(client):
    """Test error handling when prediction service initialization fails."""
    # Create valid input data but with wrong number of features
    input_data = {"features": [1.0, 2.0, 3.0, 4.0, 5.0]}  # Only 5 features, but 6 are expected

    # Make a POST request to the prediction endpoint
    response = client.post("/prediction/", json=input_data)

    # Check response status code
    assert response.status_code == 400

    # Check response content
    assert "StandardScaler is expecting 6 features" in response.json()["detail"]


def test_user_predict_endpoint_valid_input(client, mock_prediction_service):
    """Test the user prediction endpoint with valid input."""
    # Create valid user input data
    user_input_data = {
        "age": 50,
        "weight": 70,
        "height": 170,
        "ap_hi": 120,
        "ap_lo": 80,
        "cholesterol": 1
    }

    # Make a POST request to the user prediction endpoint
    response = client.post("/prediction/user", json=user_input_data)

    # Check response status code
    assert response.status_code == 200

    # Check response content
    assert response.json() == {
        "probabilité": 0.7,
        "prédiction": 1
    }

    # Verify the prediction service was called with the correct input
    mock_prediction_service.predict.assert_called_once()
    call_args = mock_prediction_service.predict.call_args[0][0]
    assert isinstance(call_args, UserInputData)
    assert call_args.age == user_input_data["age"]
    assert call_args.weight == user_input_data["weight"]
    assert call_args.height == user_input_data["height"]
    assert call_args.ap_hi == user_input_data["ap_hi"]
    assert call_args.ap_lo == user_input_data["ap_lo"]
    assert call_args.cholesterol == user_input_data["cholesterol"]


def test_user_predict_endpoint_invalid_blood_pressure(client, mock_prediction_service):
    """Test the user prediction endpoint with invalid blood pressure values."""
    # Configure the mock to pass through to the real validator
    # This is needed because the validation happens in the Pydantic model
    mock_prediction_service.predict.side_effect = ValueError("Diastolic pressure (ap_lo) must be lower than systolic pressure (ap_hi)")

    # Create invalid user input data (diastolic pressure higher than systolic)
    user_input_data = {
        "age": 50,
        "weight": 70,
        "height": 170,
        "ap_hi": 120,
        "ap_lo": 130,  # Invalid: ap_lo > ap_hi
        "cholesterol": 1
    }

    # Make a POST request to the user prediction endpoint
    response = client.post("/prediction/user", json=user_input_data)

    # Check response status code
    assert response.status_code == 422

    # Check response content contains error message
    assert "pressure" in response.json()["detail"][0]["msg"].lower()


def test_user_predict_endpoint_missing_fields(client):
    """Test the user prediction endpoint with missing required fields."""
    # Create incomplete user input data
    user_input_data = {
        "age": 50,
        "weight": 70
        # Missing height, ap_hi, ap_lo, cholesterol
    }

    # Make a POST request to the user prediction endpoint
    response = client.post("/prediction/user", json=user_input_data)

    # Check response status code
    assert response.status_code == 422  # Unprocessable Entity

    # Check response content contains field required message
    assert "field required" in response.json()["detail"][0]["msg"].lower()
