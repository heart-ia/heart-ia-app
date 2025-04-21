import {
  Calendar,
  Droplet,
  Heart,
  Loader2,
  Ruler,
  Weight,
  Zap,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SliderField } from './form-fields/slider-field';
import { UserInputData } from '@/api/prediction-service';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/libs/utils.ts';

interface PredictionFormProps {
  form: UseFormReturn<UserInputData>;
  onSubmit: (data: UserInputData) => void;
  resetForm: () => void;
  isLoading: boolean;
  realtimeMode: boolean;
  setRealtimeMode: (value: boolean) => void;
  onFormSubmit?: () => void; // Optional callback when form is submitted
}

/**
 * Form component for collecting user data for cardiovascular prediction
 */
export function PredictionForm({
  form,
  onSubmit,
  resetForm,
  isLoading,
  realtimeMode,
  setRealtimeMode,
  onFormSubmit,
}: PredictionFormProps) {
  return (
    <Card
      className={cn(
        'w-full flex-1 overflow-auto bg-white/80 shadow-md transition-shadow duration-300 hover:shadow-lg',
        realtimeMode ? 'bg-background/10 border-0' : '',
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Entrez vos informations
        </CardTitle>
        <CardDescription className="">
          Remplissez le formulaire ci-dessous pour obtenir une prédiction de
          risque cardiovasculaire
        </CardDescription>
        <div className="mt-4 flex items-center space-x-2">
          <Switch
            id="realtime-mode"
            checked={realtimeMode}
            onCheckedChange={setRealtimeMode}
          />
          <label
            htmlFor="realtime-mode"
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
                  min={18}
                  max={100}
                  description="Votre âge en années"
                />
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Poids (kg)"
                  icon={<Weight className="h-4 w-4" />}
                  min={40}
                  max={200}
                  description="Votre poids en kilogrammes"
                />
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <SliderField
                  field={field}
                  label="Taille (cm)"
                  icon={<Ruler className="h-4 w-4" />}
                  min={50}
                  max={220}
                  description="Votre taille en centimètres"
                />
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="ap_hi"
                render={({ field }) => (
                  <SliderField
                    field={field}
                    label="Pression systolique (mmHg)"
                    icon={<Heart className="h-4 w-4 text-red-500" />}
                    min={90}
                    max={200}
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
                    min={60}
                    max={140}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-yellow-500" />
                    Niveau de cholestérol
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau de cholestérol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Normal</SelectItem>
                      <SelectItem value="2">Au-dessus de la norme</SelectItem>
                      <SelectItem value="3">
                        Bien au-dessus de la norme
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Votre niveau de cholestérol selon votre dernière analyse
                    sanguine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={cn(
                'sticky bottom-0 z-10 mt-6 flex flex-col gap-2 p-4 sm:flex-row',
                realtimeMode ? 'hidden sm:flex' : '',
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
