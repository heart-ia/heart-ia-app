import { useQuery } from '@tanstack/react-query';
import { fetchPhysicalActivityChart } from '@/api/cardio-service.ts';
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

export function PhysicalActivityChart() {
  const { data: physicalActivityDistribution } = useQuery({
    queryKey: ['physical-activity-charts'],
    queryFn: fetchPhysicalActivityChart,
  });

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig | null
  >(null);

  const total = React.useMemo(
    () => ({
      num_healthy_people: physicalActivityDistribution?.data?.reduce(
        (acc, { num_healthy_people }) => acc + num_healthy_people,
        0,
      ),
      num_sick_people: physicalActivityDistribution?.data?.reduce(
        (acc, { num_sick_people }) => acc + num_sick_people,
        0,
      ),
    }),
    [physicalActivityDistribution],
  );

  if (
    !physicalActivityDistribution ||
    !physicalActivityDistribution.data ||
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
            {physicalActivityDistribution.title}
          </CardTitle>
          <CardDescription>
            {physicalActivityDistribution.description}
          </CardDescription>
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
          <BarChart accessibilityLayer data={physicalActivityDistribution.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="active"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (value === 0 ? 'Non' : 'Oui')}
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
        <div className="flex gap-2 font-bold">
          {physicalActivityDistribution.description}
        </div>
        <div className="bg-muted rounded p-3">
          On observe que la majorité des personnes étudiées sont physiquement
          actives, qu’elles soient atteintes ou non de maladies
          cardiovasculaires. Toutefois, parmi les personnes inactives, la
          proportion de cas positifs semble légèrement plus élevée, suggérant un
          déséquilibre en défaveur de la sédentarité. À l’inverse, chez les
          personnes actives, les cas sont répartis de manière plus équilibrée.
          Ces éléments suggèrent un effet protecteur potentiel de l’activité
          physique sur la santé cardiovasculaire. L’hypothèse qui en découle est
          qu’une activité physique régulière pourrait contribuer à réduire le
          risque de développer une maladie cardiovasculaire.
        </div>
      </CardFooter>
    </Card>
  );
}
