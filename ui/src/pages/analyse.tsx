import { AgeDistributionChart } from '@/components/charts/age-distribution-chart.tsx';
import { AlcoholChart } from '@/components/charts/alcohol-chart.tsx';
import { GenderDistributionChart } from '@/components/charts/gender-distribution-chart.tsx';
import { GlucoseChart } from '@/components/charts/glucose-chart.tsx';
import { PhysicalActivityChart } from '@/components/charts/physical-activity-chart.tsx';
import { SmokingChart } from '@/components/charts/smoking-chart.tsx';
import { CholesterolDistributionChart } from '@/components/charts/blood-pressure-chart.tsx';
import { CorrelationMatrixChart } from '@/components/charts/correlation-matrix-chart.tsx';
import { RiskFactorsRadarChart } from '@/components/charts/risk-factors-radar-chart.tsx';

export function AnalysePage() {
  return (
    <section className="grid gap-8 overflow-hidden px-2 pb-8 xl:px-12">
      <AgeDistributionChart />
      <GenderDistributionChart />
      <PhysicalActivityChart />
      <SmokingChart />
      <AlcoholChart />
      <CholesterolDistributionChart />
      <GlucoseChart />
      <CorrelationMatrixChart />
      <RiskFactorsRadarChart />
    </section>
  );
}
