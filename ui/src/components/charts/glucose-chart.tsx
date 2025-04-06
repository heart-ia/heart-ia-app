import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as React from 'react';
import { GlucoseChartData } from '@/types/cardio';

const chartConfig = {
  num_sick_people: {
    label: 'Nombre de malades',
    color: 'var(--chart-1)',
  },
  num_healthy_people: {
    label: 'Nombre de sains',
    color: 'var(--chart-2)',
  },
};

interface GlucoseChartProps {
  data?: GlucoseChartData;
}

export function GlucoseChart({ data: glucoseDistribution }: GlucoseChartProps) {

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig | null
  >(null);

  const total = React.useMemo(
    () => ({
      num_healthy_people: glucoseDistribution?.data?.reduce(
        (acc, { num_healthy_people }) => acc + num_healthy_people,
        0,
      ),
      num_sick_people: glucoseDistribution?.data?.reduce(
        (acc, { num_sick_people }) => acc + num_sick_people,
        0,
      ),
    }),
    [glucoseDistribution],
  );

  if (
    !glucoseDistribution ||
    !glucoseDistribution.data ||
    !total ||
    !total.num_healthy_people
  ) {
    return <div>Loading ...</div>;
  }
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl">
            {glucoseDistribution.title}
          </CardTitle>
          <CardDescription>{glucoseDistribution.description}</CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={!activeChart}
            className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 cursor-pointer flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            onClick={() => setActiveChart(null)}
          >
            <span className="text-muted-foreground text-xs">Totale</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total!.num_sick_people! + total!.num_healthy_people!}
            </span>
          </button>
          {['num_sick_people', 'num_healthy_people'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 cursor-pointer flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span
                  className="text-lg leading-none font-bold sm:text-3xl"
                  style={{ color: chartConfig[chart].color }}
                >
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-96 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={glucoseDistribution.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="gluc"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                switch (value) {
                  case 1:
                    return 'Normal';
                  case 2:
                    return 'Élevé';
                  case 3:
                    return 'Très élevé';
                  default:
                    return value;
                }
              }}
            />
            <YAxis tickLine={false} axisLine={false} domain={[0, 'dataMax']} />
            <ChartTooltip
              cursor
              content={<ChartTooltipContent indicator="dot" />}
            />
            {(!activeChart || activeChart === 'num_healthy_people') && (
              <Bar
                dataKey="num_healthy_people"
                fill="var(--color-num_healthy_people)"
                radius={4}
              />
            )}
            {(!activeChart || activeChart === 'num_sick_people') && (
              <Bar
                dataKey="num_sick_people"
                fill="var(--color-num_sick_people)"
                radius={4}
              />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-bold">
          {glucoseDistribution.description}
        </div>
        <div className="bg-muted rounded p-3">
          La médiane du taux de glucose est de 1 dans les deux groupes, ce qui
          indique un taux généralement normal chez l’ensemble des patients. De
          légères élévations (valeurs 2 et 3) apparaissent uniquement chez
          certains individus atteints de maladies cardiovasculaires, mais les
          écarts sont faibles et le graphique reste compact, rendant
          l’interprétation limitée. On peut supposer un lien potentiel entre un
          taux de glucose élevé (diabète ou pré-diabète) et le risque
          cardiovasculaire, mais cette hypothèse nécessiterait une analyse plus
          approfondie pour être confirmée.
        </div>
      </CardFooter>
    </Card>
  );
}
