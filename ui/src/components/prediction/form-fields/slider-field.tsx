import { ReactNode } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface SliderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: ReactNode;
  icon?: ReactNode;
  min: number;
  max: number;
  step?: number;
  description?: string;
}

/**
 * A reusable form field component that combines a slider and a numeric input
 */
export function SliderField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  label,
  icon,
  min,
  max,
  step = 1,
  description,
}: SliderFieldProps<TFieldValues, TName>) {
  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        {icon}
        {label}
      </FormLabel>
      <FormControl>
        <div className="flex items-center gap-4">
          <Slider
            min={min}
            max={max}
            step={step}
            value={[field.value]}
            onValueChange={(value) => field.onChange(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
