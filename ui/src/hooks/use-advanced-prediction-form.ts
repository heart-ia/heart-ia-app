import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@/hooks/use-debounce';
import {
  AdvancedInputData,
  advancedInputSchema,
  useAdvancedPrediction,
  useRealtimeAdvancedPrediction,
} from '@/api/prediction-service';

/**
 * Custom hook to manage the advanced prediction form state and logic
 */
export function useAdvancedPredictionForm() {
  const [realtimeMode, setRealtimeMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default values for the form
  const defaultValues = {
    age: 0,
    ap_hi: 0,
    ap_lo: 0,
    cholesterol: 1,
    active: 0,
  };

  // Initialize form with default values
  const form = useForm<AdvancedInputData>({
    resolver: zodResolver(advancedInputSchema),
    defaultValues,
  });

  // Watch form values for real-time updates
  const formValues = useWatch({
    control: form.control,
  });

  // Apply debounce to form values only when not in real-time mode
  const debouncedFormValues = useDebounce(formValues, 500);

  // Use either direct form values (for real-time) or debounced values
  const valuesToValidate = realtimeMode ? formValues : debouncedFormValues;

  // Validate form values before making API calls
  const validFormValues = useMemo(() => {
    try {
      // Only proceed if we have all required values
      if (
        !valuesToValidate ||
        !valuesToValidate.age ||
        !valuesToValidate.ap_hi ||
        !valuesToValidate.ap_lo ||
        !valuesToValidate.cholesterol ||
        valuesToValidate.active === undefined
      ) {
        return null;
      }

      // Validate with zod schema
      const result = advancedInputSchema.safeParse(valuesToValidate);
      return result.success ? result.data : null;
    } catch {
      return null;
    }
  }, [valuesToValidate]);

  // Use React Query for predictions
  const prediction = useAdvancedPrediction();

  // Use React Query for real-time predictions
  const realtimePrediction = useRealtimeAdvancedPrediction(
    validFormValues as AdvancedInputData,
    realtimeMode && validFormValues !== null,
  );

  // Get the result from either the manual submission or real-time prediction
  const result = realtimeMode ? realtimePrediction.data : prediction.data;

  // Determine if we're loading
  const isLoading = realtimeMode
    ? realtimePrediction.isPending
    : prediction.isPending;

  // Handle form submission
  const onSubmit = (data: AdvancedInputData) => {
    prediction.mutate(data);
  };

  // Reset form to default values
  const resetForm = () => {
    form.reset(defaultValues);
    // Clear any existing prediction results
    prediction.reset();
  };

  // Call handleErrors when errors change
  useEffect(() => {
    // Handle errors from both sources
    if (prediction.error) {
      setError(
        prediction.error.message || 'An error occurred during prediction',
      );
    } else if (realtimePrediction.error && realtimeMode) {
      setError(
        realtimePrediction.error.message ||
          'An error occurred during real-time prediction',
      );
    } else {
      setError(null);
    }
  }, [prediction.error, realtimePrediction.error, realtimeMode]);

  return {
    form,
    realtimeMode,
    setRealtimeMode,
    error,
    result,
    isLoading,
    onSubmit,
    resetForm,
  };
}
