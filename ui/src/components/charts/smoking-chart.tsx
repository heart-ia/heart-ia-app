import { useQuery } from '@tanstack/react-query';
import { fetchSmokingChart } from '@/api/cardio-service.ts';
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

export function SmokingChart() {
  const { data: smokingDistribution } = useQuery({
    queryKey: ['smoking-charts'],
    queryFn: fetchSmokingChart,
  });

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig | null
  >(null);

  const total = React.useMemo(
    () => ({
      num_healthy_people: smokingDistribution?.data?.reduce(
        (acc, { num_healthy_people }) => acc + num_healthy_people,
        0,
      ),
      num_sick_people: smokingDistribution?.data?.reduce(
        (acc, { num_sick_people }) => acc + num_sick_people,
        0,
      ),
    }),
    [smokingDistribution],
  );

  if (
    !smokingDistribution ||
    !smokingDistribution.data ||
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
            {smokingDistribution.title}
          </CardTitle>
          <CardDescription>{smokingDistribution.description}</CardDescription>
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
          <BarChart accessibilityLayer data={smokingDistribution.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="smoke"
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
        <div className="flex gap-2 leading-none font-bold">
          {smokingDistribution.description}
        </div>
        <div className="bg-muted rounded p-3">
          La majorité des individus étudiés sont non fumeurs, avec une
          répartition équilibrée entre cas atteints et non atteints. Chez les
          fumeurs, moins représentés, la proportion de cas malades est
          légèrement inférieure. Aucune tendance claire ne se dégage, ce qui
          suggère que, dans ce jeu de données, le tabagisme n’apparaît pas comme
          un facteur fortement lié aux maladies cardiovasculaires.
        </div>
      </CardFooter>
    </Card>
  );
}
