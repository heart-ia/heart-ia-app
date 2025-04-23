"""
Tests for the cardio router.

This module contains tests for the cardio router endpoints.
"""

import pytest
from starlette.testclient import TestClient

from api.models.cardio import ChartData, CorrelationAnalysis, Dataset, DatasetStatistics


def test_get_dataset_statistics(client: TestClient):
    """Test the get_dataset_statistics endpoint."""
    response = client.get("/cardio/statistics")
    assert response.status_code == 200
    data = response.json()

    # Check that the response contains the expected fields
    assert "total_records" in data
    assert "cardio_positive" in data
    assert "cardio_negative" in data
    assert "age_range" in data
    assert "bmi_range" in data
    assert "blood_pressure_range" in data

    # Check that the total records is the sum of positive and negative cases
    assert data["total_records"] == data["cardio_positive"] + data["cardio_negative"]

    # Check that the age range contains the expected fields
    assert "min" in data["age_range"]
    assert "max" in data["age_range"]
    assert "mean" in data["age_range"]
    assert "median" in data["age_range"]

    # Check that the blood pressure range contains systolic and diastolic
    assert "systolic" in data["blood_pressure_range"]
    assert "diastolic" in data["blood_pressure_range"]


def test_get_all_charts(client: TestClient):
    """Test the get_all_charts endpoint."""
    response = client.get("/cardio/charts")
    assert response.status_code == 200
    data = response.json()

    # Check that the response is a list
    assert isinstance(data, list)

    # Check that each item in the list has the expected fields
    for chart in data:
        assert "chart_type" in chart
        assert "title" in chart
        assert "description" in chart
        assert "x_label" in chart
        assert "data" in chart
        assert isinstance(chart["data"], list)


def test_get_age_distribution_chart(client: TestClient):
    """Test the get_age_distribution_chart endpoint."""
    response = client.get("/cardio/charts/age")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "histogram"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "age" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_gender_distribution_chart(client: TestClient):
    """Test the get_gender_distribution_chart endpoint."""
    response = client.get("/cardio/charts/gender")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "histogram"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "gender" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item

        # Check that gender is either "Femme" or "Homme"
        assert item["gender"] in ["Femme", "Homme"]


def test_get_blood_pressure_chart(client: TestClient):
    """Test the get_blood_pressure_chart endpoint."""
    response = client.get("/cardio/charts/blood-pressure")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "scatter"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "ap_hi" in item
        assert "ap_lo" in item
        assert "cardio" in item
        assert "age" in item
        assert "gender" in item


def test_get_blood_pressure_correlation_chart(client: TestClient):
    """Test the get_blood_pressure_correlation_chart endpoint."""
    response = client.get("/cardio/charts/blood-pressure-correlation")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "scatter"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "ap_hi" in item
        assert "ap_lo" in item
        assert "cardio" in item


def test_get_bmi_age_chart(client: TestClient):
    """Test the get_bmi_age_chart endpoint."""
    response = client.get("/cardio/charts/bmi-age")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "scatter"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "age" in item
        assert "IMC" in item
        assert "cardio" in item


def test_get_cholesterol_chart(client: TestClient):
    """Test the get_cholesterol_chart endpoint."""
    response = client.get("/cardio/charts/cholesterol")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "box"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "cholesterol" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_glucose_chart(client: TestClient):
    """Test the get_glucose_chart endpoint."""
    response = client.get("/cardio/charts/glucose")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "box"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "gluc" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_physical_activity_chart(client: TestClient):
    """Test the get_physical_activity_chart endpoint."""
    response = client.get("/cardio/charts/physical-activity")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "histogram"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "active" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_smoking_chart(client: TestClient):
    """Test the get_smoking_chart endpoint."""
    response = client.get("/cardio/charts/smoking")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "histogram"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "smoke" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_alcohol_chart(client: TestClient):
    """Test the get_alcohol_chart endpoint."""
    response = client.get("/cardio/charts/alcohol")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "histogram"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "alco" in item
        assert "num_healthy_people" in item
        assert "num_sick_people" in item


def test_get_correlation_analysis(client: TestClient):
    """Test the get_correlation_analysis endpoint."""
    response = client.get("/cardio/correlation")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "correlation_matrix" in data
    assert "feature_names" in data
    assert "top_correlations" in data

    # Check that the correlation matrix is a list of lists
    assert isinstance(data["correlation_matrix"], list)
    for row in data["correlation_matrix"]:
        assert isinstance(row, list)
        for value in row:
            assert isinstance(value, float)

    # Check that the feature names is a list of strings
    assert isinstance(data["feature_names"], list)
    for name in data["feature_names"]:
        assert isinstance(name, str)

    # Check that the top correlations is a list of dictionaries
    assert isinstance(data["top_correlations"], list)
    for corr in data["top_correlations"]:
        assert "feature" in corr
        assert "correlation" in corr
        assert isinstance(corr["feature"], str)
        assert isinstance(corr["correlation"], float)


def test_get_risk_factors_radar_chart(client: TestClient):
    """Test the get_risk_factors_radar_chart endpoint."""
    response = client.get("/cardio/charts/risk-factors-radar")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "chart_type" in data
    assert "title" in data
    assert "description" in data
    assert "x_label" in data
    assert "y_label" in data
    assert "data" in data

    # Check that the chart type is correct
    assert data["chart_type"] == "radar"

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that each item in the data list has the expected fields
    for item in data["data"]:
        assert "factor" in item
        assert "value" in item
        assert isinstance(item["factor"], str)
        assert isinstance(item["value"], (int, float))


def test_get_complete_dataset(client: TestClient):
    """Test the get_complete_dataset endpoint."""
    response = client.get("/cardio/dataset")
    assert response.status_code == 200
    data = response.json()

    # Check that the response has the expected fields
    assert "data" in data
    assert "total_records" in data

    # Check that the data is a list
    assert isinstance(data["data"], list)

    # Check that the total_records matches the length of the data list
    assert data["total_records"] == len(data["data"])

    # Check that each item in the data list has the expected fields
    if data["data"]:  # Only check if there's at least one record
        first_record = data["data"][0]
        assert "age" in first_record
        assert "gender" in first_record
        assert "ap_hi" in first_record
        assert "ap_lo" in first_record
        assert "cholesterol" in first_record
        assert "gluc" in first_record
        assert "smoke" in first_record
        assert "alco" in first_record
        assert "active" in first_record
        assert "cardio" in first_record
        assert "IMC" in first_record
