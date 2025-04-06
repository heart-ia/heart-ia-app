import { useQuery } from '@tanstack/react-query';
import { fetchAgeDistributionChart } from '@/api/cardio-service.ts';
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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

export function AgeDistributionChart() {
  const { data: ageDistribution } = useQuery({
    queryKey: ['page-charts'],
    queryFn: fetchAgeDistributionChart,
  });

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig | null
  >(null);

  const total = React.useMemo(
    () => ({
      num_healthy_people: ageDistribution?.data?.reduce(
        (acc, { num_healthy_people }) => acc + num_healthy_people,
        0,
      ),
      num_sick_people: ageDistribution?.data?.reduce(
        (acc, { num_sick_people }) => acc + num_sick_people,
        0,
      ),
    }),
    [ageDistribution],
  );

  if (
    !ageDistribution ||
    !ageDistribution.data ||
    !total ||
    !total.num_healthy_people
  ) {
    return <div>Loading ...</div>;
  }
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl">{ageDistribution.title}</CardTitle>
          <CardDescription>{ageDistribution.description}</CardDescription>
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
          <AreaChart accessibilityLayer data={ageDistribution.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="age"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} domain={[0, 'dataMax']} />
            <ChartTooltip
              cursor
              content={<ChartTooltipContent indicator="dot" />}
            />
            {(!activeChart || activeChart === 'num_healthy_people') && (
              <Area
                type="natural"
                dataKey="num_healthy_people"
                fill="var(--color-num_healthy_people)"
                stroke="var(--color-num_healthy_people)"
                fillOpacity={0.4}
                radius={4}
                stackId="a"
              />
            )}
            {(!activeChart || activeChart === 'num_sick_people') && (
              <Area
                type="natural"
                dataKey="num_sick_people"
                fill="var(--color-num_sick_people)"
                stroke="var(--color-num_sick_people)"
                fillOpacity={0.4}
                radius={4}
                stackId="a"
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-bold">
          Ce graphique montre la répartition des individus atteints ou non de
          maladies cardiovasculaires en fonction de leur âge.
        </div>
        <div className="bg-muted rounded p-3">
          La majorité des individus atteints de maladies cardiovasculaires se
          situent dans la tranche d'âge de 50 à 60 ans, tandis que la plupart
          des individus sains se trouvent dans la tranche d'âge de 20 à 30 ans.
        </div>
      </CardFooter>
    </Card>
  );
}
