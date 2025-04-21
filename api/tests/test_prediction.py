"""
Tests for the prediction service.

This module contains tests for the prediction service.
"""

import os
import pytest
from unittest.mock import patch, MagicMock

import numpy as np

from api.services.prediction_service import PredictionService, InputData


@pytest.fixture
def mock_joblib_load():
    """Mock joblib.load to avoid loading actual models."""
    with patch("joblib.load") as mock_load:
        # Create a mock model with predict_proba method
        mock_model = MagicMock()
        mock_model.predict_proba.return_value = np.array([[0.3, 0.7]])
        
        # Create a mock threshold
        mock_threshold = 0.5
        
        # Configure the mock to return different values based on the argument
        def side_effect(path):
            if "mlp_modele_f1_073.joblib" in path:
                return mock_model
            elif "seuil_optimal.joblib" in path:
                return mock_threshold
            else:
                raise FileNotFoundError(f"Mock file not found: {path}")
        
        mock_load.side_effect = side_effect
        yield mock_load


@pytest.fixture
def prediction_service(mock_joblib_load):
    """Create a prediction service with mocked models."""
    return PredictionService()


def test_prediction_service_initialization(mock_joblib_load):
    """Test that the prediction service initializes correctly."""
    service = PredictionService()
    assert service.model is not None
    assert service.threshold is not None
    
    # Verify joblib.load was called with the correct paths
    assert mock_joblib_load.call_count == 2
    calls = [call[0][0] for call in mock_joblib_load.call_args_list]
    assert any("mlp_modele_f1_073.joblib" in call for call in calls)
    assert any("seuil_optimal.joblib" in call for call in calls)


def test_predict_valid_input(prediction_service):
    """Test prediction with valid input."""
    # Create valid input data
    input_data = InputData(features=[1.0, 2.0, 3.0, 4.0, 5.0])
    
    # Get prediction
    result = prediction_service.predict(input_data)
    
    # Check result structure
    assert "probabilité" in result
    assert "prédiction" in result
    
    # Check result values
    assert result["probabilité"] == 0.7
    assert result["prédiction"] == 1


def test_predict_invalid_input(prediction_service):
    """Test prediction with invalid input that raises ValueError."""
    # Create invalid input data (empty features)
    input_data = InputData(features=[])
    
    # Expect ValueError when predicting
    with pytest.raises(ValueError):
        prediction_service.predict(input_data)


def test_model_loading_error():
    """Test error handling when model loading fails."""
    # Mock joblib.load to raise an exception
    with patch("joblib.load", side_effect=FileNotFoundError("Model file not found")):
        # Expect RuntimeError when initializing
        with pytest.raises(RuntimeError) as excinfo:
            PredictionService()
        
        # Check error message
        assert "Failed to load model or threshold" in str(excinfo.value)