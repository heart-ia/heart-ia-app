"""
Prediction service for cardiovascular disease.

This module provides services for predicting cardiovascular disease using a trained model.
"""

import os
from enum import IntEnum
from typing import Dict, List, Union

import joblib
import numpy as np
from pydantic import BaseModel, Field, field_validator


class CholesterolLevel(IntEnum):
    """Cholesterol level enumeration."""
    NORMAL = 1
    ABOVE_NORMAL = 2
    WELL_ABOVE_NORMAL = 3


class InputData(BaseModel):
    """Input data model for prediction."""
    features: List[float] = Field(..., description="List of features for prediction")


class UserInputData(BaseModel):
    """User input data model for cardiovascular disease prediction."""
    age: int = Field(..., description="Age in years", ge=0, le=120)
    weight: float = Field(..., description="Weight in kg", gt=0, le=300)
    height: float = Field(..., description="Height in cm", gt=0, le=250)
    ap_hi: int = Field(..., description="Systolic blood pressure (mmHg)", ge=10, le=200)
    ap_lo: int = Field(..., description="Diastolic blood pressure (mmHg)", ge=10, le=140)
    cholesterol: CholesterolLevel = Field(..., description="Cholesterol level (1=normal, 2=above normal, 3=well above normal)")

    @field_validator('ap_lo')
    @classmethod
    def validate_blood_pressure(cls, ap_lo, info):
        """Validate that diastolic pressure is lower than systolic pressure."""
        values = info.data
        if 'ap_hi' in values and ap_lo >= values['ap_hi']:
            raise ValueError("Diastolic pressure (ap_lo) must be lower than systolic pressure (ap_hi)")
        return ap_lo


class PredictionService:
    """Service for cardiovascular disease prediction."""

    def __init__(self):
        """Initialize the service with trained model and threshold."""
        # Get the absolute path to the joblibs directory
        joblibs_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "joblibs"
        )

        try:
            self.model = joblib.load(os.path.join(joblibs_path, "modele_mlp_optimise.joblib"))
            self.threshold = joblib.load(os.path.join(joblibs_path, "seuil_optimal.joblib"))
            self.scaler = joblib.load(os.path.join(joblibs_path, "scalerValide.save"))
        except (FileNotFoundError, IOError) as e:
            raise RuntimeError(f"Failed to load model or threshold: {str(e)}")

    def calculate_features(self, data: UserInputData) -> Dict[str, float]:
        """
        Calculate derived features from user input.

        Args:
            data: UserInputData object containing user input

        Returns:
            Dict containing all features needed for prediction
        """
        # Calculate BMI (IMC)
        imc = data.weight / ((data.height / 100) ** 2)

        # Calculate risk score
        risk_score = (
            0.6 * data.ap_hi +
            0.4 * int(data.cholesterol) +
            0.3 * data.age
        )

        # Calculate mean arterial pressure (MAP)
        map_value = (data.ap_hi + 2 * data.ap_lo) / 3

        return {
            'risk_score': risk_score,
            'ap_hi': float(data.ap_hi),
            'IMC': imc,
            'map': map_value,
            'age': float(data.age),
            'cholesterol': float(data.cholesterol)
        }

    def normalize_features(self, features: Dict[str, float]) -> np.ndarray:
        """
        Normalize features using StandardScaler.

        Args:
            features: Dict containing calculated features

        Returns:
            Normalized features as numpy array
        """
        # Extract features in the correct order
        feature_order = ['risk_score', 'ap_hi', 'IMC', 'map', 'age', 'cholesterol']
        feature_values = [features[feature] for feature in feature_order]

        # Convert to numpy array
        return np.array(feature_values).reshape(1, -1)

    def predict(self, data: Union[InputData, UserInputData]) -> Dict[str, Union[float, int]]:
        """
        Predict cardiovascular disease based on input features.

        Args:
            data: InputData or UserInputData object containing features for prediction

        Returns:
            Dict containing probability and prediction (0 or 1)

        Raises:
            ValueError: If input data is invalid
            RuntimeError: If prediction fails
        """
        try:
            # Process input data based on its type
            if isinstance(data, UserInputData):
                # Calculate features from user input
                features = self.calculate_features(data)
                x = self.normalize_features(features)

            else:
                x = np.array(data.features).reshape(1, -1)

            x_scaled = self.scaler.transform(x)

            # Get prediction probability
            prob = self.model.predict_proba(x_scaled)[0][1]

            # Determine prediction based on threshold
            prediction = int(prob >= self.threshold)

            return {
                "probability": round(prob, 4),
                "prediction": prediction
            }
        except (ValueError, IndexError) as e:
            raise ValueError(f"Invalid input data: {str(e)}")
        except Exception as e:
            raise RuntimeError(f"Prediction failed: {str(e)}")
