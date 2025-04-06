"""
Cardiovascular disease analysis models.

This module defines the Pydantic models for cardiovascular disease analysis.
"""

from enum import Enum
from typing import Dict, List, Optional, Union

from pydantic import BaseModel, Field


class Gender(int, Enum):
    """Gender enumeration."""
    FEMALE = 1
    MALE = 2


class CholesterolLevel(int, Enum):
    """Cholesterol level enumeration."""
    NORMAL = 1
    ABOVE_NORMAL = 2
    WELL_ABOVE_NORMAL = 3


class GlucoseLevel(int, Enum):
    """Glucose level enumeration."""
    NORMAL = 1
    ABOVE_NORMAL = 2
    WELL_ABOVE_NORMAL = 3


class PatientData(BaseModel):
    """Patient data model."""
    age: int = Field(..., description="Age of the patient in years")
    gender: Gender = Field(..., description="Gender of the patient")
    height: float = Field(..., description="Height of the patient in cm")
    weight: float = Field(..., description="Weight of the patient in kg")
    ap_hi: int = Field(..., description="Systolic blood pressure")
    ap_lo: int = Field(..., description="Diastolic blood pressure")
    cholesterol: CholesterolLevel = Field(..., description="Cholesterol level")
    gluc: GlucoseLevel = Field(..., description="Glucose level")
    smoke: bool = Field(..., description="Whether the patient smokes")
    alco: bool = Field(..., description="Whether the patient drinks alcohol")
    active: bool = Field(..., description="Whether the patient is physically active")
    cardio: Optional[bool] = Field(None, description="Presence of cardiovascular disease")


class DatasetStatistics(BaseModel):
    """Dataset statistics model."""
    total_records: int = Field(..., description="Total number of records in the dataset")
    cardio_positive: int = Field(..., description="Number of records with cardiovascular disease")
    cardio_negative: int = Field(..., description="Number of records without cardiovascular disease")
    age_range: Dict[str, float] = Field(..., description="Min, max, mean, and median age")
    bmi_range: Dict[str, float] = Field(..., description="Min, max, mean, and median BMI")
    blood_pressure_range: Dict[str, Dict[str, float]] = Field(
        ..., description="Min, max, mean, and median blood pressure (systolic and diastolic)"
    )


class ChartData(BaseModel):
    """Chart data model."""
    chart_type: str = Field(..., description="Type of chart (histogram, scatter, box, etc.)")
    title: str = Field(..., description="Chart title")
    description: str = Field(..., description="Chart description")
    x_label: str = Field(..., description="X-axis label")
    y_label: Optional[str] = Field(None, description="Y-axis label")
    data: List[Dict[str, Union[str, int, float, bool]]] = Field(..., description="Chart data")


class CorrelationAnalysis(BaseModel):
    """Correlation analysis model."""
    correlation_matrix: List[List[float]] = Field(..., description="Correlation matrix")
    feature_names: List[str] = Field(..., description="Feature names")
    top_correlations: List[Dict[str, Union[str, float]]] = Field(
        ..., description="Top correlations with cardiovascular disease"
    )


class Dataset(BaseModel):
    """Dataset model containing all patient records."""
    data: List[Dict[str, Union[str, int, float, bool]]] = Field(..., description="List of patient records")
    total_records: int = Field(..., description="Total number of records in the dataset")
