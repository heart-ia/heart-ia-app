import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { DatasetType } from '@/types/cardio.ts';
import { Activity, Cigarette, Heart, HeartPulse, Wine, X } from 'lucide-react';

// Custom cell renderer for Cardio column
const CardioRenderer = (props: ICellRendererParams) => {
  const value = props.valueFormatted || props.value;
  const isMalade = value === 'Malade';

  return (
    <div className="flex items-center">
      <div
        className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium ${
          isMalade
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}
      >
        {isMalade ? (
          <HeartPulse className="mr-1 h-3.5 w-3.5 stroke-current" />
        ) : (
          <Heart className="mr-1 h-3.5 w-3.5 stroke-current" />
        )}
        {value}
      </div>
    </div>
  );
};

// Custom cell renderer for Gender column
const GenderRenderer = (props: ICellRendererParams) => {
  const value = props.valueFormatted || props.value;
  const isFemme = value === 'Femme';

  return (
    <div className="flex items-center">
      <div
        className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
          isFemme
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : 'bg-blue-100 dark:bg-blue-900 dark:text-blue-200'
        }`}
      >
        {isFemme ? <span>👩</span> : <span>👨</span>}
        {value}
      </div>
    </div>
  );
};

const SmokeRenderer = (props: ICellRendererParams) => {
  const value = props.valueFormatted || props.value;
  const isYes = value === 'Oui';

  return (
    <div className="flex items-center">
      <div
        className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
          isYes
            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
        }`}
      >
        {isYes ? (
          <Cigarette className="mr-1 h-3.5 w-3.5 stroke-current" />
        ) : (
          <X className="mr-1 h-3.5 w-3.5 stroke-current" />
        )}
        {value}
      </div>
    </div>
  );
};

// Custom cell renderer for Alcohol column
const AlcoholRenderer = (props: ICellRendererParams) => {
  const value = props.valueFormatted || props.value;
  const isYes = value === 'Oui';

  return (
    <div className="flex items-center">
      <div
        className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
          isYes
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
        }`}
      >
        {isYes ? (
          <Wine className="mr-1 h-3.5 w-3.5 stroke-current" />
        ) : (
          <X className="mr-1 h-3.5 w-3.5 stroke-current" />
        )}
        {value}
      </div>
    </div>
  );
};

// Custom cell renderer for Active column
const ActiveRenderer = (props: ICellRendererParams) => {
  const value = props.valueFormatted || props.value;
  const isYes = value === 'Oui';

  return (
    <div className="flex items-center">
      <div
        className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
          isYes
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
        }`}
      >
        {isYes ? (
          <Activity className="mr-1 h-3.5 w-3.5 stroke-current" />
        ) : (
          <X className="mr-1 h-3.5 w-3.5 stroke-current" />
        )}
        {value}
      </div>
    </div>
  );
};

export const dataSetColumns: ColDef<DatasetType>[] = [
  {
    field: 'cardio',
    headerName: 'Cardio',
    sortable: true,
    filter: true,
    valueGetter: ({ data }) => (data?.cardio === 1 ? 'Malade' : 'Sain'),
    cellRenderer: CardioRenderer,
    // For filtering and sorting, we still need the text value
    filterValueGetter: ({ data }) => (data?.cardio === 1 ? 'Malade' : 'Sain'),
  },
  {
    field: 'age',
    headerName: 'Âge',
    sortable: true,
    filter: true,
  },
  {
    field: 'gender',
    headerName: 'Genre',
    valueFormatter: ({ value }) => (value === 1 ? 'Femme' : 'Homme'),
    cellRenderer: GenderRenderer,
    // For filtering and sorting, we still need the text value
    filterValueGetter: ({ data }) => (data?.cardio === 1 ? 'Femme' : 'Homme'),
    sortable: true,
    filter: true,
  },
  {
    field: 'ap_hi',
    headerName: 'Tension Systolique (ap_hi)',
    sortable: true,
    filter: true,
  },
  {
    field: 'ap_lo',
    headerName: 'Tension Diastolique (ap_lo)',
    sortable: true,
    filter: true,
  },
  {
    field: 'cholesterol',
    headerName: 'Cholestérol',
    sortable: true,
    filter: true,
  },
  {
    field: 'gluc',
    headerName: 'Glucose',
    sortable: true,
    filter: true,
  },
  {
    field: 'smoke',
    headerName: 'Fumeur',
    valueFormatter: ({ value }) => (value === 1 ? 'Oui' : 'Non'),
    cellRenderer: SmokeRenderer,
    filterValueGetter: ({ data }) => (data?.smoke === 1 ? 'Oui' : 'Non'),
    sortable: true,
    filter: true,
  },
  {
    field: 'alco',
    headerName: 'Alcool',
    valueFormatter: ({ value }) => (value === 1 ? 'Oui' : 'Non'),
    cellRenderer: AlcoholRenderer,
    filterValueGetter: ({ data }) => (data?.alco === 1 ? 'Oui' : 'Non'),
    sortable: true,
    filter: true,
  },
  {
    field: 'active',
    headerName: 'Actif',
    valueFormatter: ({ value }) => (value === 1 ? 'Oui' : 'Non'),
    cellRenderer: ActiveRenderer,
    filterValueGetter: ({ data }) => (data?.active === 1 ? 'Oui' : 'Non'),
    sortable: true,
    filter: true,
  },
  {
    field: 'IMC',
    headerName: 'IMC',
    sortable: true,
    filter: true,
  },
];
