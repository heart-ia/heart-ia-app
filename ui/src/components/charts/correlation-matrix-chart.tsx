import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CorrelationAnalysis } from '@/types/cardio';

// Mapping of technical feature names to descriptive French names
const featureNameMapping: Record<string, string> = {
  age: 'Âge',
  IMC: 'Indice de Masse Corporelle',
  ap_hi: 'Pression Systolique',
  ap_lo: 'Pression Diastolique',
  cholesterol: 'Cholestérol',
  gluc: 'Glucose',
  smoke: 'Tabagisme',
  alco: "Consommation d'Alcool",
  active: 'Activité Physique',
  cardio: 'Maladie Cardiovasculaire',
};

interface CorrelationMatrixChartProps {
  data?: CorrelationAnalysis;
}

export function CorrelationMatrixChart({ data: correlationAnalysis }: CorrelationMatrixChartProps) {
  if (!correlationAnalysis) {
    return null;
  }

  const { correlation_matrix, feature_names, top_correlations } =
    correlationAnalysis;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl">
            Carte thermique des corrélations entre variables
          </CardTitle>
          <CardDescription>
            Cette matrice de corrélation illustre la force des relations
            linéaires entre les différentes variables de l'étude.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full p-6">
        <div>
          <Table>
            <TableCaption>
              Matrice de corrélation des variables cardiovasculaires
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]"></TableHead>
                {feature_names.map((name) => (
                  <TableHead key={name} className="text-center">
                    {featureNameMapping[name] || name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {correlation_matrix.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableHead className="font-medium">
                    {featureNameMapping[feature_names[rowIndex]] ||
                      feature_names[rowIndex]}
                  </TableHead>
                  {row.map((value, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="text-center"
                      style={{
                        backgroundColor: getCorrelationColor(value),
                        color: Math.abs(value) > 0.5 ? 'white' : 'black',
                        fontWeight: rowIndex === colIndex ? 'bold' : 'normal',
                      }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">
            Facteurs les plus corrélés avec les maladies cardiovasculaires
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facteur</TableHead>
                <TableHead className="text-right">Corrélation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {top_correlations.map(({ feature, correlation }) => (
                <TableRow key={feature}>
                  <TableCell className="font-medium">
                    {featureNameMapping[feature] || feature}
                  </TableCell>
                  <TableCell
                    className={
                      correlation > 0
                        ? 'text-right font-medium text-green-600'
                        : 'text-right font-medium text-red-600'
                    }
                  >
                    {correlation > 0 ? '+' : ''}
                    {correlation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="bg-muted rounded p-3">
          La corrélation entre la pression systolique (ap_hi) et diastolique
          (ap_lo) est très forte (+0.73), ce qui est logique puisqu’il s’agit de
          deux composantes de la tension artérielle. Une corrélation modérée est
          également observée entre le cholestérol et le glucose (+0.45),
          suggérant une possible co-variation chez certains profils
          métaboliques. En revanche, le tabac, l’alcool et l’activité physique
          présentent des corrélations très faibles avec la variable cardio,
          proches de zéro. Ainsi, la tension artérielle, l’âge, le cholestérol
          et l’IMC semblent être les facteurs les plus liés aux maladies
          cardiovasculaires dans ce jeu de données. À l’inverse, les
          comportements comme le tabagisme ou la consommation d’alcool montrent
          une relation plus faible, possiblement en raison d’un effet indirect
          ou d’une sous-déclaration.
        </div>
      </CardFooter>
    </Card>
  );
}

// Helper function to get a color based on correlation value
function getCorrelationColor(value: number): string {
  // Viridis-like color scale
  if (value >= 0.8) return '#440154'; // Dark purple
  if (value >= 0.6) return '#414487'; // Purple
  if (value >= 0.4) return '#2a788e'; // Blue
  if (value >= 0.2) return '#22a884'; // Teal
  if (value >= 0) return '#7ad151'; // Green
  if (value >= -0.2) return '#fde725'; // Yellow
  if (value >= -0.4) return '#fdb32f'; // Orange
  if (value >= -0.6) return '#e7502c'; // Light red
  if (value >= -0.8) return '#d01c8b'; // Pink
  return '#7f3b08'; // Dark red
}
