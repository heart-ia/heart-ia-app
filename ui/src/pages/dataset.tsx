import { fetchCompleteDataset } from '@/api/cardio-service.ts';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { dataSetColumns } from '@/pages/dataset-columns.tsx';
import { useRef } from 'react';
import { themeQuartz } from 'ag-grid-enterprise';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertCircle,
  Database,
  Download,
  FileSpreadsheet,
  RefreshCw,
} from 'lucide-react';

// Common font family for all themes
const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export function DatasetPage() {
  const {
    data: { data: dataset } = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dataset'],
    queryFn: fetchCompleteDataset,
  });
  const gridRef = useRef<AgGridReact>(null);

  const handleExportCSV = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv({
        fileName: 'heart-ia-dataset.csv',
      });
    }
  };

  const myTheme = themeQuartz
    .withParams({
      fontFamily,
      headerFontFamily: fontFamily,
      cellFontFamily: fontFamily,
    })
    .withParams(
      {
        browserColorScheme: 'light',
      },
      'light',
    )
    .withParams(
      {
        backgroundColor: '#171717FF',
        foregroundColor: '#FAFAFAFF',
        browserColorScheme: 'dark',
      },
      'dark',
    );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold">
            Erreur de chargement des données
          </h3>
          <p className="text-muted-foreground mb-4">
            Une erreur s'est produite lors du chargement du jeu de données.
          </p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </div>
      );
    }

    if (!dataset || dataset.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Database className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">
            Aucune donnée disponible
          </h3>
          <p className="text-muted-foreground mb-4">
            Le jeu de données est vide ou n'a pas pu être chargé.
          </p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      );
    }

    return (
      <AgGridReact
        ref={gridRef}
        rowData={dataset}
        columnDefs={dataSetColumns}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 15, 20, 50, 100]}
        rowSelection="multiple"
        pagination={true}
        domLayout="autoHeight"
        animateRows={true}
        cellSelection={true}
        enableCharts={true}
        theme={myTheme}
        defaultColDef={{
          sortable: true,
          filter: true,
          floatingFilter: true,
        }}
      />
    );
  };

  return (
    <div className="px-2 py-6 lg:px-12">
      <Card>
        <CardHeader className="flex flex-col items-center justify-between xl:flex-row">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <FileSpreadsheet className="mr-2 h-6 w-6" />
              Jeu de données
            </CardTitle>
            <CardDescription>
              Visualisez et analysez le jeu de données complet des patients
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={isLoading || !dataset}
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
        <CardFooter className="text-muted-foreground text-sm">
          {dataset
            ? `${dataset.length} enregistrements trouvés`
            : 'Aucun enregistrement'}
        </CardFooter>
      </Card>
    </div>
  );
}
