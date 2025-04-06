/**
 * Cardiovascular disease analysis types.
 *
 * This module defines the TypeScript types for cardiovascular disease analysis.
 */

/**
 * Gender enumeration.
 */
export enum Gender {
  FEMALE = 1,
  MALE = 2,
}

/**
 * Cholesterol level enumeration.
 */
export enum CholesterolLevel {
  NORMAL = 1,
  ABOVE_NORMAL = 2,
  WELL_ABOVE_NORMAL = 3,
}

/**
 * Glucose level enumeration.
 */
export enum GlucoseLevel {
  NORMAL = 1,
  ABOVE_NORMAL = 2,
  WELL_ABOVE_NORMAL = 3,
}

/**
 * Patient data model.
 */
export interface PatientData {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  ap_hi: number;
  ap_lo: number;
  cholesterol: CholesterolLevel;
  gluc: GlucoseLevel;
  smoke: boolean;
  alco: boolean;
  active: boolean;
  cardio?: boolean;
}

/**
 * Dataset statistics model.
 */
export interface DatasetStatistics {
  total_records: number;
  cardio_positive: number;
  cardio_negative: number;
  age_range: {
    min: number;
    max: number;
    mean: number;
    median: number;
  };
  bmi_range: {
    min: number;
    max: number;
    mean: number;
    median: number;
  };
  blood_pressure_range: {
    systolic: {
      min: number;
      max: number;
      mean: number;
      median: number;
    };
    diastolic: {
      min: number;
      max: number;
      mean: number;
      median: number;
    };
  };
}

/**
 * Chart data model.
 */
export interface ChartData<T = Record<string, string | number | boolean>> {
  chart_type: string;
  title: string;
  description: string;
  x_label: string;
  y_label?: string;
  data: Array<T>;
}

export type AgeDistributionChartData = ChartData<{
  age: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type GenderDistributionChartData = ChartData<{
  age: number;
  num_sick_people: number;
  num_healthy_people: number;
  gender: string;
}>;

export type PhysicalActivityChartData = ChartData<{
  active: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type SmokingChartData = ChartData<{
  smoke: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type AlcoholChartData = ChartData<{
  alco: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type CholesterolChartData = ChartData<{
  cholesterol: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type GlucoseChartData = ChartData<{
  gluc: number;
  num_sick_people: number;
  num_healthy_people: number;
}>;

export type BloodPressureCorrelationChartData = ChartData<{
  ap_hi: number;
  ap_lo: number;
  cardio: number;
}>;

export type RiskFactorsRadarChartData = ChartData<{
  factor: string;
  value: number;
}>;

/**
 * Correlation analysis model.
 */
export interface CorrelationAnalysis {
  correlation_matrix: number[][];
  feature_names: string[];
  top_correlations: Array<{
    feature: string;
    correlation: number;
  }>;
}
