import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { AgeDistributionChart } from '@/components/charts/age-distribution-chart.tsx';
import { AlcoholChart } from '@/components/charts/alcohol-chart.tsx';
import { GenderDistributionChart } from '@/components/charts/gender-distribution-chart.tsx';
import { GlucoseChart } from '@/components/charts/glucose-chart.tsx';
import { PhysicalActivityChart } from '@/components/charts/physical-activity-chart.tsx';
import { SmokingChart } from '@/components/charts/smoking-chart.tsx';
import { CholesterolDistributionChart } from '@/components/charts/blood-pressure-chart.tsx';
import { CorrelationMatrixChart } from '@/components/charts/correlation-matrix-chart.tsx';
import { RiskFactorsRadarChart } from '@/components/charts/risk-factors-radar-chart.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  fetchAgeDistributionChart,
  fetchAlcoholChart,
  fetchCholesterolChart,
  fetchCorrelationAnalysis,
  fetchGenderDistributionChart,
  fetchGlucoseChart,
  fetchPhysicalActivityChart,
  fetchRiskFactorsRadarChart,
  fetchSmokingChart,
} from '@/api/cardio-service.ts';

export function AnalysePage() {
  // State to track which queries are enabled
  const [enabledQueries, setEnabledQueries] = useState({
    ageDistribution: true,
    genderDistribution: false,
    physicalActivity: false,
    smoking: false,
    alcohol: false,
    cholesterol: false,
    glucose: false,
    correlationMatrix: false,
    riskFactors: false,
  });

  // Use React Query to fetch all chart data
  const chartQueries = useQueries({
    queries: [
      {
        queryKey: ['age-distribution-chart'],
        queryFn: fetchAgeDistributionChart,
        staleTime: Infinity,
        enabled: enabledQueries.ageDistribution,
      },
      {
        queryKey: ['gender-distribution-chart'],
        queryFn: fetchGenderDistributionChart,
        staleTime: Infinity,
        enabled: enabledQueries.genderDistribution,
      },
      {
        queryKey: ['physical-activity-chart'],
        queryFn: fetchPhysicalActivityChart,
        staleTime: Infinity,
        enabled: enabledQueries.physicalActivity,
      },
      {
        queryKey: ['smoking-chart'],
        queryFn: fetchSmokingChart,
        staleTime: Infinity,
        enabled: enabledQueries.smoking,
      },
      {
        queryKey: ['alcohol-chart'],
        queryFn: fetchAlcoholChart,
        staleTime: Infinity,
        enabled: enabledQueries.alcohol,
      },
      {
        queryKey: ['cholesterol-chart'],
        queryFn: fetchCholesterolChart,
        staleTime: Infinity,
        enabled: enabledQueries.cholesterol,
      },
      {
        queryKey: ['glucose-chart'],
        queryFn: fetchGlucoseChart,
        staleTime: Infinity,
        enabled: enabledQueries.glucose,
      },
      {
        queryKey: ['correlation-matrix-chart'],
        queryFn: fetchCorrelationAnalysis,
        staleTime: Infinity,
        enabled: enabledQueries.correlationMatrix,
      },
      {
        queryKey: ['risk-factors-radar-chart'],
        queryFn: fetchRiskFactorsRadarChart,
        staleTime: Infinity,
        enabled: enabledQueries.riskFactors,
      },
    ],
  });

  // Enable queries sequentially
  useEffect(() => {
    // Check if age distribution query is successful
    if (chartQueries[0].isSuccess && !enabledQueries.genderDistribution) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, genderDistribution: true }));
      }, 300);
    }

    // Check if gender distribution query is successful
    if (chartQueries[1].isSuccess && !enabledQueries.physicalActivity) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, physicalActivity: true }));
      }, 300);
    }

    // Check if physical activity query is successful
    if (chartQueries[2].isSuccess && !enabledQueries.smoking) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, smoking: true }));
      }, 300);
    }

    // Check if smoking query is successful
    if (chartQueries[3].isSuccess && !enabledQueries.alcohol) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, alcohol: true }));
      }, 300);
    }

    // Check if alcohol query is successful
    if (chartQueries[4].isSuccess && !enabledQueries.cholesterol) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, cholesterol: true }));
      }, 300);
    }

    // Check if cholesterol query is successful
    if (chartQueries[5].isSuccess && !enabledQueries.glucose) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, glucose: true }));
      }, 300);
    }

    // Check if glucose query is successful
    if (chartQueries[6].isSuccess && !enabledQueries.correlationMatrix) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, correlationMatrix: true }));
      }, 300);
    }

    // Check if correlation matrix query is successful
    if (chartQueries[7].isSuccess && !enabledQueries.riskFactors) {
      setTimeout(() => {
        setEnabledQueries((prev) => ({ ...prev, riskFactors: true }));
      }, 300);
    }
  }, [chartQueries, enabledQueries]);

  // Chart skeleton component
  const ChartSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="flex">
          <Skeleton className="m-4 h-20 w-32" />
          <Skeleton className="m-4 h-20 w-32" />
          <Skeleton className="m-4 h-20 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-96 w-full" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-24 w-full" />
      </CardFooter>
    </Card>
  );

  // Error handling component
  const ChartError = ({ message }: { message: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>Error Loading Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-destructive">{message}</div>
      </CardContent>
    </Card>
  );

  return (
    <section className="grid gap-8 overflow-hidden px-2 pb-8 xl:px-12">
      {!enabledQueries.ageDistribution || chartQueries[0].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[0].isError ? (
        <ChartError
          message={`Error loading age distribution chart: ${chartQueries[0].error?.toString()}`}
        />
      ) : (
        <AgeDistributionChart data={chartQueries[0].data} />
      )}

      {!enabledQueries.genderDistribution || chartQueries[1].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[1].isError ? (
        <ChartError
          message={`Error loading gender distribution chart: ${chartQueries[1].error?.toString()}`}
        />
      ) : (
        <GenderDistributionChart data={chartQueries[1].data} />
      )}

      {!enabledQueries.physicalActivity || chartQueries[2].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[2].isError ? (
        <ChartError
          message={`Error loading physical activity chart: ${chartQueries[2].error?.toString()}`}
        />
      ) : (
        <PhysicalActivityChart data={chartQueries[2].data} />
      )}

      {!enabledQueries.smoking || chartQueries[3].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[3].isError ? (
        <ChartError
          message={`Error loading smoking chart: ${chartQueries[3].error?.toString()}`}
        />
      ) : (
        <SmokingChart data={chartQueries[3].data} />
      )}

      {!enabledQueries.alcohol || chartQueries[4].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[4].isError ? (
        <ChartError
          message={`Error loading alcohol chart: ${chartQueries[4].error?.toString()}`}
        />
      ) : (
        <AlcoholChart data={chartQueries[4].data} />
      )}

      {!enabledQueries.cholesterol || chartQueries[5].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[5].isError ? (
        <ChartError
          message={`Error loading cholesterol chart: ${chartQueries[5].error?.toString()}`}
        />
      ) : (
        <CholesterolDistributionChart data={chartQueries[5].data} />
      )}

      {!enabledQueries.glucose || chartQueries[6].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[6].isError ? (
        <ChartError
          message={`Error loading glucose chart: ${chartQueries[6].error?.toString()}`}
        />
      ) : (
        <GlucoseChart data={chartQueries[6].data} />
      )}

      {!enabledQueries.correlationMatrix || chartQueries[7].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[7].isError ? (
        <ChartError
          message={`Error loading correlation matrix chart: ${chartQueries[7].error?.toString()}`}
        />
      ) : (
        <CorrelationMatrixChart data={chartQueries[7].data} />
      )}

      {!enabledQueries.riskFactors || chartQueries[8].isLoading ? (
        <ChartSkeleton />
      ) : chartQueries[8].isError ? (
        <ChartError
          message={`Error loading risk factors radar chart: ${chartQueries[8].error?.toString()}`}
        />
      ) : (
        <RiskFactorsRadarChart data={chartQueries[8].data} />
      )}
    </section>
  );
}
