import { motion } from 'framer-motion';
import { AlertTriangle, Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PredictionResult } from '@/api/prediction-service';
import PredictionResultDisplay from './prediction-result-display';
import ResultDescription from './result-description';
import { useEffect, useState } from 'react';

interface PredictionResultsProps {
  result: PredictionResult | undefined;
  error: string | null;
  isRealtime: boolean;
}

/**
 * Component for displaying prediction results or error messages
 */
export function PredictionResults({
  result,
  error,
  isRealtime,
}: PredictionResultsProps) {
  // State to track if we've ever had a result
  const [hasEverHadResult, setHasEverHadResult] = useState(false);

  // State to store the last valid result
  const [lastResult, setLastResult] = useState<PredictionResult | undefined>(
    undefined,
  );

  // Update state when we get a result
  useEffect(() => {
    if (result) {
      setHasEverHadResult(true);
      setLastResult(result);
    }
  }, [result]);

  return (
    <Card className="flex h-full w-full flex-col justify-between overflow-hidden p-0 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">
          Résultat de la prédiction
        </CardTitle>
        <CardDescription className="">
          Votre risque de maladie cardiovasculaire basé sur les informations
          fournies
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 sm:p-6">
        {error ? (
          <motion.div
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Erreur</p>
              <p>{error}</p>
            </div>
          </motion.div>
        ) : hasEverHadResult && result ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Only this component will update in real-time mode */}
            <PredictionResultDisplay result={result} isRealtime={isRealtime} />

            {/* Memoized component that won't update in real-time mode */}
            <ResultDescription result={result} />
          </div>
        ) : !hasEverHadResult ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-gray-400">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <Heart className="h-16 w-16 text-gray-200" />
            </motion.div>
            <p className="mx-auto max-w-md text-center">
              Remplissez le formulaire et cliquez sur "Obtenir ma prédiction"
              pour voir votre résultat ici
            </p>
          </div>
        ) : lastResult ? (
          // If we have a last result but no current result, show the last result
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Use the last result for display */}
            <PredictionResultDisplay
              result={lastResult}
              isRealtime={isRealtime}
            />

            {/* Memoized component that won't update in real-time mode */}
            <ResultDescription result={lastResult} />
          </div>
        ) : (
          // Fallback loading state (should rarely be seen)
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-56 w-56 items-center justify-center rounded-full">
              <p className="text-gray-400">Chargement...</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-3 sm:p-4">
        <div className="flex items-start justify-center gap-2 text-xs">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 sm:mt-0" />
          <p className="text-left sm:text-center">
            Cette prédiction est basée sur un modèle d'intelligence artificielle
            et ne remplace pas l'avis d'un professionnel de santé.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
