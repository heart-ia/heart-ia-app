/**
 * Cardiovascular disease analysis service.
 *
 * This module provides services for fetching cardiovascular disease analysis data from the API.
 */

import {
  AgeDistributionChartData,
  AlcoholChartData,
  BloodPressureCorrelationChartData,
  ChartData,
  CholesterolChartData,
  CorrelationAnalysis,
  DatasetStatistics,
  DatasetType,
  GenderDistributionChartData,
  GlucoseChartData,
  PhysicalActivityChartData,
  RiskFactorsRadarChartData,
  SmokingChartData,
} from '@/types/cardio';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Fetch dataset statistics.
 *
 * @returns {Promise<DatasetStatistics>} Dataset statistics.
 */
export async function fetchDatasetStatistics(): Promise<DatasetStatistics> {
  const response = await fetch(`${API_URL}/cardio/statistics`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch dataset statistics: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch all chart data.
 *
 * @returns {Promise<ChartData[]>} List of all chart data.
 */
export async function fetchAllCharts(): Promise<ChartData[]> {
  const response = await fetch(`${API_URL}/cardio/charts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch chart data: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch age distribution chart data.
 *
 * @returns {Promise<ChartData>} Age distribution chart data.
 */
export async function fetchAgeDistributionChart(): Promise<AgeDistributionChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/age`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch age distribution chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch gender distribution chart data.
 *
 * @returns {Promise<ChartData>} Gender distribution chart data.
 */
export async function fetchGenderDistributionChart(): Promise<GenderDistributionChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/gender`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch gender distribution chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch blood pressure chart data.
 *
 * @returns {Promise<ChartData>} Blood pressure chart data.
 */
export async function fetchBloodPressureChart(): Promise<ChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/blood-pressure`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch blood pressure chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch BMI vs age chart data.
 *
 * @returns {Promise<ChartData>} BMI vs age chart data.
 */
export async function fetchBmiAgeChart(): Promise<ChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/bmi-age`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch BMI vs age chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch cholesterol chart data.
 *
 * @returns {Promise<ChartData>} Cholesterol chart data.
 */
export async function fetchCholesterolChart(): Promise<CholesterolChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/cholesterol`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch cholesterol chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch glucose chart data.
 *
 * @returns {Promise<GlucoseChartData>} Glucose chart data.
 */
export async function fetchGlucoseChart(): Promise<GlucoseChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/glucose`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch glucose chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch physical activity chart data.
 *
 * @returns {Promise<PhysicalActivityChartData>} Physical activity chart data.
 */
export async function fetchPhysicalActivityChart(): Promise<PhysicalActivityChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/physical-activity`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch physical activity chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch smoking chart data.
 *
 * @returns {Promise<SmokingChartData>} Smoking chart data.
 */
export async function fetchSmokingChart(): Promise<SmokingChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/smoking`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch smoking chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch alcohol consumption chart data.
 *
 * @returns {Promise<AlcoholChartData>} Alcohol consumption chart data.
 */
export async function fetchAlcoholChart(): Promise<AlcoholChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/alcohol`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch alcohol chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch blood pressure correlation chart data.
 *
 * @returns {Promise<BloodPressureCorrelationChartData>} Blood pressure correlation chart data.
 */
export async function fetchBloodPressureCorrelationChart(): Promise<BloodPressureCorrelationChartData> {
  const response = await fetch(
    `${API_URL}/cardio/charts/blood-pressure-correlation`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch blood pressure correlation chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch risk factors radar chart data.
 *
 * @returns {Promise<RiskFactorsRadarChartData>} Risk factors radar chart data.
 */
export async function fetchRiskFactorsRadarChart(): Promise<RiskFactorsRadarChartData> {
  const response = await fetch(`${API_URL}/cardio/charts/risk-factors-radar`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch risk factors radar chart data: ${response.statusText}`,
    );
  }
  return response.json();
}

export async function fetchCorrelationAnalysis(): Promise<CorrelationAnalysis> {
  const response = await fetch(`${API_URL}/cardio/correlation`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch correlation analysis: ${response.statusText}`,
    );
  }
  return response.json();
}

/**
 * Fetch the complete dataset with all patient records.
 *
 * @returns {Promise<any>} The complete dataset with all patient records.
 */
export async function fetchCompleteDataset(): Promise<{ data: DatasetType[] }> {
  const response = await fetch(`${API_URL}/cardio/dataset`);
  if (!response.ok) {
    throw new Error(`Failed to fetch complete dataset: ${response.statusText}`);
  }
  return response.json();
}
