import { useHelloWorld } from '@/hooks/useHelloWorld';

export function HomePage() {
  const { data, isLoading, isError, error } = useHelloWorld();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Accueil</h1>
      <div className="bg-muted/50 min-h-[80vh] flex-1 rounded-xl p-6">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg">Chargement...</p>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-destructive text-lg">
              Erreur:{' '}
              {error instanceof Error
                ? error.message
                : 'Une erreur est survenue'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Message de l'API:</h2>
            <div className="bg-card rounded-lg p-4 shadow">
              <p className="text-lg">{data?.Hello}</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Ce message provient de l'API FastAPI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
