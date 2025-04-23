"""
Cardiovascular disease prediction router.

This module defines the routes for cardiovascular disease prediction.
"""

from fastapi import APIRouter, Depends, HTTPException

from api.services.prediction_service import InputData, UserInputData, PredictionService, CholesterolLevel

router = APIRouter(
    prefix="/prediction",
    tags=["prediction"],
    responses={404: {"description": "Not found"}},
)


def get_prediction_service() -> PredictionService:
    """
    Get the cardiovascular disease prediction service.

    Returns:
        PredictionService: The cardiovascular disease prediction service.
    """
    try:
        return PredictionService()
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def predict_cardiovascular_disease(
    data: InputData,
    prediction_service: PredictionService = Depends(get_prediction_service),
):
    """
    Predict cardiovascular disease based on input features.

    This endpoint accepts a list of pre-processed features for prediction.
    For user-friendly input, use the /user endpoint instead.

    Args:
        data: Input data containing features for prediction
        prediction_service: The prediction service

    Returns:
        Dict containing probability and prediction (0 or 1)
    """
    try:
        return prediction_service.predict(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/user")
async def predict_from_user_data(
    data: UserInputData,
    prediction_service: PredictionService = Depends(get_prediction_service),
):
    """
    Predict cardiovascular disease based on user-friendly input.

    This endpoint accepts user-friendly input parameters and processes them
    to make a prediction.

    Args:
        data: User input data containing age, weight, height, blood pressure, and cholesterol
        prediction_service: The prediction service

    Returns:
        Dict containing probability and prediction (0 or 1)

    Example:
        ```json
        {
            "age": 50,
            "weight": 70,
            "height": 170,
            "ap_hi": 120,
            "ap_lo": 80,
            "cholesterol": 1
        }
        ```
    """
    try:
        return prediction_service.predict(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
