import { useQuery } from '@tanstack/react-query';
import { fetchBloodPressureCorrelationChart } from '@/api/cardio-service.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function BloodPressureCorrelationChart() {
  const {
    data: bloodPressureCorrelation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blood-pressure-correlation-chart'],
    queryFn: fetchBloodPressureCorrelationChart,
  });

  if (isLoading) {
    return <div>Loading blood pressure correlation chart...</div>;
  }

  if (error || !bloodPressureCorrelation) {
    return <div>Error loading blood pressure correlation chart</div>;
  }

  // Extract correlation coefficient from the description
  const correlationMatch = bloodPressureCorrelation.description.match(
    /corrélation entre ces deux variables est de ([\d.]+)/i,
  );
  const correlationCoefficient = correlationMatch ? correlationMatch[1] : 'N/A';

  // Group data by cardio status for different colors
  const healthyData = bloodPressureCorrelation.data.filter(
    (item) => item.cardio === 0,
  );
  const sickData = bloodPressureCorrelation.data.filter(
    (item) => item.cardio === 1,
  );

  // Calculate trend line
  const allData = bloodPressureCorrelation.data;
  const n = allData.length;

  // Calculate means
  const meanX = allData.reduce((sum, item) => sum + item.ap_hi, 0) / n;
  const meanY = allData.reduce((sum, item) => sum + item.ap_lo, 0) / n;

  // Calculate slope and intercept for trend line
  const numerator = allData.reduce(
    (sum, item) => sum + (item.ap_hi - meanX) * (item.ap_lo - meanY),
    0,
  );
  const denominator = allData.reduce(
    (sum, item) => sum + Math.pow(item.ap_hi - meanX, 2),
    0,
  );

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  // Create trend line data
  const minX = Math.min(...allData.map((item) => item.ap_hi));
  const maxX = Math.max(...allData.map((item) => item.ap_hi));

  const trendLineData = [
    { ap_hi: minX, ap_lo: slope * minX + intercept },
    { ap_hi: maxX, ap_lo: slope * maxX + intercept },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl">
            {bloodPressureCorrelation.title}
          </CardTitle>
          <CardDescription>
            {bloodPressureCorrelation.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-md bg-blue-100 px-4 py-2">
            Coefficient de corrélation:{' '}
            <span className="font-bold">{correlationCoefficient}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={bloodPressureCorrelation.data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ap_hi"
              name="Pression Systolique"
              label={{
                value: bloodPressureCorrelation.x_label,
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis
              dataKey="ap_lo"
              name="Pression Diastolique"
              label={{
                value: bloodPressureCorrelation.y_label,
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === 'ap_hi'
                  ? 'Pression Systolique'
                  : 'Pression Diastolique',
              ]}
              labelFormatter={(label) => `Pression Systolique: ${label}`}
            />
            <Legend />
            <Scatter
              name="Patients sans maladie cardiovasculaire"
              data={healthyData}
              fill="#8884d8"
              shape="circle"
            />
            <Scatter
              name="Patients avec maladie cardiovasculaire"
              data={sickData}
              fill="#ff7300"
              shape="circle"
            />
            <Line
              name="Ligne de tendance"
              data={trendLineData}
              type="linear"
              dataKey="ap_lo"
              stroke="#ff0000"
              dot={false}
              activeDot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-bold">
          {bloodPressureCorrelation.description}
        </div>
        <div className="bg-muted rounded p-3">
          Ce graphique confirme que les pressions systolique et diastolique
          varient dans le même sens, ce qui justifie l'intérêt de les étudier
          ensemble dans les analyses de risque cardiovasculaire. Une pression
          artérielle élevée dans les deux cas semble donc un indicateur
          pertinent pour évaluer le danger cardio.
        </div>
      </CardFooter>
    </Card>
  );
}
