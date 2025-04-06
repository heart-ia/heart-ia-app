"""
Cardiovascular disease analysis router.

This module defines the routes for cardiovascular disease analysis.
"""

from typing import List

from fastapi import APIRouter, Depends

from api.models.cardio import ChartData, CorrelationAnalysis, DatasetStatistics
from api.services.cardio_service import CardioService

router = APIRouter(
    prefix="/cardio",
    tags=["cardio"],
    responses={404: {"description": "Not found"}},
)


def get_cardio_service() -> CardioService:
    """
    Get the cardiovascular disease analysis service.

    Returns:
        CardioService: The cardiovascular disease analysis service.
    """
    return CardioService()


@router.get("/statistics", response_model=DatasetStatistics)
async def get_dataset_statistics(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> DatasetStatistics:
    """
    Get dataset statistics.

    Returns:
        DatasetStatistics: Dataset statistics.
    """
    return cardio_service.get_dataset_statistics()


@router.get("/charts", response_model=List[ChartData])
async def get_all_charts(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> List[ChartData]:
    """
    Get all chart data.

    Returns:
        List[ChartData]: List of all chart data.
    """
    return cardio_service.get_all_charts()


@router.get("/charts/age", response_model=ChartData)
async def get_age_distribution_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get age distribution chart data.

    Returns:
        ChartData: Age distribution chart data.
    """
    return cardio_service.get_age_distribution_chart()


@router.get("/charts/gender", response_model=ChartData)
async def get_gender_distribution_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get gender distribution chart data.

    Returns:
        ChartData: Gender distribution chart data.
    """
    return cardio_service.get_gender_distribution_chart()


@router.get("/charts/blood-pressure", response_model=ChartData)
async def get_blood_pressure_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get blood pressure chart data.

    Returns:
        ChartData: Blood pressure chart data.
    """
    return cardio_service.get_blood_pressure_chart()


@router.get("/charts/blood-pressure-correlation", response_model=ChartData)
async def get_blood_pressure_correlation_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get blood pressure correlation chart data.

    Returns:
        ChartData: Blood pressure correlation chart data.
    """
    return cardio_service.get_blood_pressure_correlation_chart()


@router.get("/charts/bmi-age", response_model=ChartData)
async def get_bmi_age_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get BMI vs age chart data.

    Returns:
        ChartData: BMI vs age chart data.
    """
    return cardio_service.get_bmi_age_chart()


@router.get("/charts/cholesterol", response_model=ChartData)
async def get_cholesterol_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get cholesterol chart data.

    Returns:
        ChartData: Cholesterol chart data.
    """
    return cardio_service.get_cholesterol_chart()


@router.get("/charts/glucose", response_model=ChartData)
async def get_glucose_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get glucose chart data.

    Returns:
        ChartData: Glucose chart data.
    """
    return cardio_service.get_glucose_chart()


@router.get("/charts/physical-activity", response_model=ChartData)
async def get_physical_activity_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get physical activity chart data.

    Returns:
        ChartData: Physical activity chart data.
    """
    return cardio_service.get_physical_activity_chart()


@router.get("/charts/smoking", response_model=ChartData)
async def get_smoking_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get smoking chart data.

    Returns:
        ChartData: Smoking chart data.
    """
    return cardio_service.get_smoking_chart()


@router.get("/charts/alcohol", response_model=ChartData)
async def get_alcohol_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get alcohol consumption chart data.

    Returns:
        ChartData: Alcohol consumption chart data.
    """
    return cardio_service.get_alcohol_chart()


@router.get("/correlation", response_model=CorrelationAnalysis)
async def get_correlation_analysis(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> CorrelationAnalysis:
    """
    Get correlation analysis.

    Returns:
        CorrelationAnalysis: Correlation analysis.
    """
    return cardio_service.get_correlation_analysis()


@router.get("/charts/risk-factors-radar", response_model=ChartData)
async def get_risk_factors_radar_chart(
    cardio_service: CardioService = Depends(get_cardio_service),
) -> ChartData:
    """
    Get risk factors radar chart data.

    Returns:
        ChartData: Risk factors radar chart data.
    """
    return cardio_service.get_risk_factors_radar_chart()
