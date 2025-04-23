import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp } from 'lucide-react';
import { PredictionResult } from '@/api/prediction-service';

interface ResultDescriptionProps {
  result: PredictionResult;
}

/**
 * Displays a textual description of the prediction result
 * This component is memoized to avoid unnecessary re-renders
 */
const ResultDescription = memo(({ result }: ResultDescriptionProps) => {
  const isHighRisk = result.prediction === 1;

  return (
    <motion.div
      className="rounded-lg bg-gray-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
        {isHighRisk ? (
          <>
            <TrendingUp className="h-5 w-5 text-red-500" />
            Risque élevé de maladie cardiovasculaire
          </>
        ) : (
          <>
            <Heart className="h-5 w-5 text-green-500" />
            Risque faible de maladie cardiovasculaire
          </>
        )}
      </h3>
      <p className="text-gray-600">
        {isHighRisk
          ? 'Selon notre modèle, vous présentez un risque élevé de maladie cardiovasculaire. Nous vous recommandons de consulter un professionnel de santé.'
          : 'Selon notre modèle, vous présentez un risque faible de maladie cardiovasculaire. Continuez à maintenir un mode de vie sain.'}
      </p>
    </motion.div>
  );
});

export default ResultDescription;
