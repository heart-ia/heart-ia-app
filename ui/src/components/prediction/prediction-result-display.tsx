import { memo } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/libs/utils.ts';
import { PredictionResult } from '@/api/prediction-service';

// Props interface for the component
interface PredictionResultDisplayProps {
  result: PredictionResult;
  isRealtime: boolean;
}

/**
 * Displays the prediction result with visual indicators
 * Only this component will update in real-time mode
 */
const PredictionResultDisplay = memo(
  ({ result, isRealtime }: PredictionResultDisplayProps) => {
    const probability = Math.round(result.probability * 100);
    const isHighRisk = result.prediction === 1;

    // Calculate color based on probability (gradient from green to red)
    const getColor = () => {
      if (isHighRisk) {
        // Red gradient for high risk (darker red for higher probability)
        return probability > 75
          ? 'from-red-600 to-red-500'
          : 'from-red-500 to-red-400';
      } else {
        // Green gradient for low risk (darker green for lower probability)
        return probability < 25
          ? 'from-green-600 to-green-500'
          : 'from-green-500 to-green-400';
      }
    };

    return (
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative mb-6">
          <motion.div
            className={cn(
              'flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br p-1',
              getColor(),
            )}
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 0 0 rgba(0,0,0,0)',
                '0 0 20px rgba(0,0,0,0.2)',
                '0 0 0 rgba(0,0,0,0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: isRealtime ? Infinity : 0,
              repeatDelay: 1,
            }}
          >
            <div className="bg-accent flex h-52 w-52 flex-col items-center justify-center rounded-full">
              {isHighRisk ? (
                <ShieldAlert className="mb-2 h-10 w-10 text-red-500" />
              ) : (
                <ShieldCheck className="mb-2 h-10 w-10 text-green-500" />
              )}
              <motion.div
                className="flex flex-col items-center"
                key={probability} // Force re-render on probability change
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl font-bold">{probability}%</div>
                <div className="mt-1 text-sm text-gray-500">de risque</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Activity indicator for real-time mode */}
          {isRealtime && (
            <motion.div
              className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  },
);

export default PredictionResultDisplay;
