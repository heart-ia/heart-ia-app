import {
  Activity,
  Calendar,
  Droplet,
  Heart,
  Loader2,
  Zap,
} from 'lucide-react';
import { Form, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SliderField } from './form-fields/slider-field';
import { AdvancedInputData } from '@/api/prediction-service';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/libs/utils.ts';

interface AdvancedPredictionFormProps {
  form: UseFormReturn<AdvancedInputData>;
  onSubmit: (data: AdvancedInputData) => void;
  resetForm: () => void;
  isLoading: boolean;
  realtimeMode: boolean;
  setRealtimeMode: (value: boolean) => void;
  onFormSubmit?: () => void; // Optional callback when form is submitted
}

/**
 * Form component for collecting advanced data for cardiovascular prediction
 */
export function AdvancedPredictionForm({
  form,
  onSubmit,
  resetForm,
  isLoading,
  realtimeMode,
  setRealtimeMode,
  onFormSubmit,
}: AdvancedPredictionFormProps) {
  return (
    <Card
      className={cn(
        'w-full flex-1 overflow-auto shadow-md transition-shadow duration-300 hover:shadow-lg',
        realtimeMode ? 'bg-background/10 border-0' : '',
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Paramètres avancés
        </CardTitle>
        <CardDescription className="">
          Entrez directement les paramètres techniques pour la prédiction de
          risque cardiovasculaire
        </CardDescription>
        <div className="mt-4 flex items-center space-x-2">
          <Switch
            id="realtime-mode-advanced"
            checked={realtimeMode}
            onCheckedChange={setRealtimeMode}
          />
          <label
            htmlFor="realtime-mode-advanced"
            className="flex cursor-pointer items-center gap-1.5 text-sm font-medium"
          >
            <Zap
              className={`h-4 w-4 ${realtimeMode ? 'text-yellow-500' : 'text-gray-400'}`}
            />
            Mode temps réel
          </label>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              form.handleSubmit((data) => {
                onSubmit(data);
                // Call onFormSubmit if it exists
                if (onFormSubmit) {
                  onFormSubmit();
                }
              })(e);
            }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Âge (années)"
                  icon={<Calendar className="h-4 w-4" />}
                  min={-2}
                  max={2}
                  step={0.1}
                  description="Âge en années (normalisé)"
                />
              )}
            />

            <FormField
              control={form.control}
              name="ap_hi"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Pression systolique (mmHg)"
                  icon={<Heart className="h-4 w-4 text-red-500" />}
                  min={-2}
                  max={2}
                  step={0.1}
                  description="Pression artérielle systolique (normalisée)"
                />
              )}
            />

            <FormField
              control={form.control}
              name="ap_lo"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Pression diastolique (mmHg)"
                  icon={<Heart className="h-4 w-4 text-blue-500" />}
                  min={-2}
                  max={2}
                  step={0.1}
                  description="Pression artérielle diastolique (normalisée)"
                />
              )}
            />

            <FormField
              control={form.control}
              name="cholesterol"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Niveau de cholestérol"
                  icon={<Droplet className="h-4 w-4 text-yellow-500" />}
                  min={1}
                  max={3}
                  step={1}
                  description="Niveau de cholestérol (1=normal, 2=au-dessus de la norme, 3=bien au-dessus de la norme)"
                />
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Activité physique"
                  icon={<Activity className="h-4 w-4 text-green-500" />}
                  min={0}
                  max={1}
                  step={1}
                  description="Activité physique régulière (0=non, 1=oui)"
                />
              )}
            />

            <div
              className={cn(
                'sticky bottom-0 z-10 mt-6 flex flex-col gap-2 rounded-lg p-4 shadow-md sm:flex-row',
                realtimeMode ? 'hidden sm:flex-row' : '',
              )}
            >
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || realtimeMode}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calcul en cours...
                  </>
                ) : realtimeMode ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                    Mode temps réel activé
                  </>
                ) : (
                  'Obtenir ma prédiction'
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="sm:w-auto"
                disabled={isLoading}
              >
                Réinitialiser
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
