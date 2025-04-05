import { useHelloWorld } from '@/hooks/useHelloWorld';

export function HomePage() {
  const { data, isLoading, isError, error } = useHelloWorld();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Accueil</h1>
      <div className="bg-muted/50 min-h-[80vh] flex-1 rounded-xl p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">Chargement...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-destructive">
              Erreur: {error instanceof Error ? error.message : 'Une erreur est survenue'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Message de l'API:</h2>
            <div className="bg-card p-4 rounded-lg shadow">
              <p className="text-lg">{data?.Hello}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Ce message provient de l'API FastAPI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
