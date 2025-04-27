/**
 * Cardiovascular disease prediction service.
 *
 * This module provides services for making predictions about cardiovascular disease.
 */

import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';

// Define the API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Define the schema for user input data
export const userInputSchema = z
  .object({
    age: z.number().min(0).max(120),
    ap_hi: z.number().min(0).max(200),
    ap_lo: z.number().min(0).max(140),
    cholesterol: z.number().min(1).max(3),
    active: z.number().min(0).max(1),
  })
  .refine((data) => data.ap_lo < data.ap_hi, {
    message:
      'Diastolic pressure (ap_lo) must be lower than systolic pressure (ap_hi)',
    path: ['ap_lo'],
  });

// Define the schema for advanced input data
export const advancedInputSchema = z.object({
  age: z.number(),
  ap_hi: z.number(),
  ap_lo: z.number(),
  cholesterol: z.number().max(3),
  active: z.number().min(0).max(1),
});

// Define the type for user input data
export type UserInputData = z.infer<typeof userInputSchema>;

// Define the type for advanced input data
export type AdvancedInputData = z.infer<typeof advancedInputSchema>;

// Define the type for prediction result
export interface PredictionResult {
  probability: number; // Changed from French "probabilité"
  prediction: number; // Changed from French "prédiction"
}

/**
 * Make a prediction based on user input data.
 *
 * @param data User input data
 * @returns Promise with prediction result
 */
export async function predictFromUserData(
  data: UserInputData,
): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/prediction/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || `Prediction failed: ${response.statusText}`,
    );
  }

  return await response.json();
}

/**
 * Make a prediction based on advanced input data.
 *
 * @param data Advanced input data
 * @returns Promise with prediction result
 */
export async function predictFromAdvancedData(
  data: AdvancedInputData,
): Promise<PredictionResult> {
  // Convert to the format expected by the API
  const inputData = {
    features: [
      data.age,
      data.ap_hi,
      data.ap_lo,
      data.cholesterol,
      data.active,
    ],
  };

  const response = await fetch(`${API_URL}/prediction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || `Prediction failed: ${response.statusText}`,
    );
  }

  return await response.json();
}

/**
 * React Query hook for making predictions with user-friendly data.
 *
 * @returns Mutation object for making predictions
 */
export function usePrediction() {
  return useMutation({
    mutationFn: predictFromUserData,
  });
}

/**
 * React Query hook for making predictions with advanced data.
 *
 * @returns Mutation object for making predictions
 */
export function useAdvancedPrediction() {
  return useMutation({
    mutationFn: predictFromAdvancedData,
  });
}

/**
 * React Query hook for real-time predictions with user-friendly data.
 *
 * @param data User input data
 * @param enabled Whether to enable the query
 * @returns Query result with prediction data
 */
export function useRealtimePrediction(data: UserInputData, enabled: boolean) {
  return useQuery({
    queryKey: ['prediction', data],
    queryFn: () => predictFromUserData(data),
    enabled: enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

/**
 * React Query hook for real-time predictions with advanced data.
 *
 * @param data Advanced input data
 * @param enabled Whether to enable the query
 * @returns Query result with prediction data
 */
export function useRealtimeAdvancedPrediction(
  data: AdvancedInputData,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ['advanced-prediction', data],
    queryFn: () => predictFromAdvancedData(data),
    enabled: enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
