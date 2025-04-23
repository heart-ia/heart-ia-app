"""
Tests for the prediction service.

This module contains tests for the prediction service.
"""

import os
import pytest
from unittest.mock import patch, MagicMock

import numpy as np
from pydantic import ValidationError

from api.services.prediction_service import (
    PredictionService, InputData, UserInputData, CholesterolLevel
)


@pytest.fixture
def mock_joblib_load():
    """Mock joblib.load to avoid loading actual models."""
    with patch("joblib.load") as mock_load:
        # Create a mock model with predict_proba method
        mock_model = MagicMock()
        mock_model.predict_proba.return_value = np.array([[0.3, 0.7]])

        # Create a mock threshold
        mock_threshold = 0.5

        # Create a mock scaler
        mock_scaler = MagicMock()
        mock_scaler.transform.return_value = np.array([[1.0, 2.0, 3.0, 4.0, 5.0, 6.0]])

        # Configure the mock to return different values based on the argument
        def side_effect(path):
            if "mlp_modele_f1_0736.joblib" in path:
                return mock_model
            elif "seuil_optimal.joblib" in path:
                return mock_threshold
            elif "scaler.save" in path:
                return mock_scaler
            else:
                raise FileNotFoundError(f"Mock file not found: {path}")

        mock_load.side_effect = side_effect
        yield mock_load


@pytest.fixture
def prediction_service(mock_joblib_load):
    """Create a prediction service with mocked models."""
    return PredictionService()


@pytest.fixture
def valid_user_input_data():
    """Create a valid UserInputData instance."""
    return UserInputData(
        age=45,
        weight=70.5,
        height=175.0,
        ap_hi=120,
        ap_lo=80,
        cholesterol=CholesterolLevel.NORMAL
    )


def test_cholesterol_level_enum():
    """Test CholesterolLevel enum values."""
    assert CholesterolLevel.NORMAL == 1
    assert CholesterolLevel.ABOVE_NORMAL == 2
    assert CholesterolLevel.WELL_ABOVE_NORMAL == 3


def test_input_data_validation():
    """Test InputData validation."""
    # Valid input
    input_data = InputData(features=[1.0, 2.0, 3.0, 4.0, 5.0, 6.0])
    assert input_data.features == [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]

    # Invalid input (missing features)
    with pytest.raises(ValidationError):
        InputData()


def test_user_input_data_validation():
    """Test UserInputData validation."""
    # Valid input
    user_data = UserInputData(
        age=45,
        weight=70.5,
        height=175.0,
        ap_hi=120,
        ap_lo=80,
        cholesterol=CholesterolLevel.NORMAL
    )
    assert user_data.age == 45
    assert user_data.weight == 70.5
    assert user_data.height == 175.0
    assert user_data.ap_hi == 120
    assert user_data.ap_lo == 80
    assert user_data.cholesterol == CholesterolLevel.NORMAL

    # Invalid input (ap_lo >= ap_hi)
    with pytest.raises(ValidationError):
        UserInputData(
            age=45,
            weight=70.5,
            height=175.0,
            ap_hi=120,
            ap_lo=120,  # Equal to ap_hi
            cholesterol=CholesterolLevel.NORMAL
        )

    # Invalid input (age out of range)
    with pytest.raises(ValidationError):
        UserInputData(
            age=150,  # Too high
            weight=70.5,
            height=175.0,
            ap_hi=120,
            ap_lo=80,
            cholesterol=CholesterolLevel.NORMAL
        )


def test_prediction_service_initialization(mock_joblib_load):
    """Test that the prediction service initializes correctly."""
    service = PredictionService()
    assert service.model is not None
    assert service.threshold is not None
    assert service.scaler is not None

    # Verify joblib.load was called with the correct paths
    assert mock_joblib_load.call_count == 3
    calls = [call[0][0] for call in mock_joblib_load.call_args_list]
    assert any("mlp_modele_f1_0736.joblib" in call for call in calls)
    assert any("seuil_optimal.joblib" in call for call in calls)
    assert any("scaler.save" in call for call in calls)


def test_calculate_features(prediction_service, valid_user_input_data):
    """Test calculate_features method."""
    features = prediction_service.calculate_features(valid_user_input_data)

    # Check all expected features are present
    assert "risk_score" in features
    assert "ap_hi" in features
    assert "IMC" in features
    assert "map" in features
    assert "age" in features
    assert "cholesterol" in features

    # Check some calculated values
    assert features["ap_hi"] == 120.0
    assert features["age"] == 45.0
    assert features["cholesterol"] == 1.0

    # Check BMI calculation
    expected_bmi = 70.5 / ((175.0 / 100) ** 2)
    assert features["IMC"] == pytest.approx(expected_bmi)

    # Check risk score calculation
    expected_risk_score = 0.6 * 120 + 0.4 * 1 + 0.3 * 45
    assert features["risk_score"] == pytest.approx(expected_risk_score)

    # Check MAP calculation
    expected_map = (120 + 2 * 80) / 3
    assert features["map"] == pytest.approx(expected_map)


def test_normalize_features(prediction_service):
    """Test normalize_features method."""
    features = {
        'risk_score': 100.0,
        'ap_hi': 120.0,
        'IMC': 25.0,
        'map': 93.33,
        'age': 45.0,
        'cholesterol': 1.0
    }

    result = prediction_service.normalize_features(features)

    # Check result is a numpy array with correct shape
    assert isinstance(result, np.ndarray)
    assert result.shape == (1, 6)

    # Check feature order
    expected_order = [100.0, 120.0, 25.0, 93.33, 45.0, 1.0]
    for i, val in enumerate(expected_order):
        assert result[0, i] == pytest.approx(val)


def test_predict_with_input_data(prediction_service):
    """Test prediction with InputData."""
    # Create valid input data
    input_data = InputData(features=[1.0, 2.0, 3.0, 4.0, 5.0, 6.0])

    # Get prediction
    result = prediction_service.predict(input_data)

    # Check result structure
    assert "probability" in result
    assert "prediction" in result

    # Check result values
    assert result["probability"] == 0.7
    assert result["prediction"] == 1


def test_predict_with_user_input_data(prediction_service, valid_user_input_data):
    """Test prediction with UserInputData."""
    # Get prediction
    result = prediction_service.predict(valid_user_input_data)

    # Check result structure
    assert "probability" in result
    assert "prediction" in result

    # Check result values
    assert result["probability"] == 0.7
    assert result["prediction"] == 1


def test_predict_invalid_input(prediction_service):
    """Test prediction with invalid input that raises a ValueError."""
    # Create a valid InputData but make the scaler raise an exception
    input_data = InputData(features=[1.0])

    # Patch the scaler's transform method to raise an exception
    prediction_service.scaler.transform = MagicMock(side_effect=ValueError("Invalid input"))

    # Expect ValueError when predicting
    with pytest.raises(ValueError):
        prediction_service.predict(input_data)


def test_predict_general_exception(prediction_service):
    """Test prediction with an input that raises a general exception."""
    # Create a valid InputData
    input_data = InputData(features=[1.0])

    # Patch the model's predict_proba method to raise a general exception
    prediction_service.model.predict_proba = MagicMock(side_effect=Exception("General error"))

    # Expect RuntimeError when predicting
    with pytest.raises(RuntimeError) as excinfo:
        prediction_service.predict(input_data)

    # Check error message
    assert "Prediction failed" in str(excinfo.value)


def test_model_loading_error():
    """Test error handling when model loading fails."""
    # Mock joblib.load to raise an exception
    with patch("joblib.load", side_effect=FileNotFoundError("Model file not found")):
        # Expect RuntimeError when initializing
        with pytest.raises(RuntimeError) as excinfo:
            PredictionService()

        # Check error message
        assert "Failed to load model or threshold" in str(excinfo.value)
