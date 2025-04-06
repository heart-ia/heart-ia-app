import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { RiskFactorsRadarChartData } from '@/types/cardio';

interface RiskFactorsRadarChartProps {
  data?: RiskFactorsRadarChartData;
}

export function RiskFactorsRadarChart({ data: riskFactorsRadar }: RiskFactorsRadarChartProps) {
  if (!riskFactorsRadar) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl">{riskFactorsRadar.title}</CardTitle>
          <CardDescription>{riskFactorsRadar.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={riskFactorsRadar.data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="factor" />
            <PolarRadiusAxis />
            <Radar
              name="Valeur moyenne"
              dataKey="value"
              stroke="red"
              fill="red"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value) => [`${value}`, 'Valeur moyenne']}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-bold">
          {riskFactorsRadar.description}
        </div>
        <div className="bg-muted rounded p-3">
          La pression artérielle systolique semble être le facteur le plus
          marqué chez les patients atteints de maladies cardiovasculaires. Cela
          pourrait en faire un indicateur prioritaire de prévention. Les autres
          variables comme l'âge et l'IMC viennent ensuite, ce qui est cohérent
          avec les recommandations cliniques.
        </div>
      </CardFooter>
    </Card>
  );
}
