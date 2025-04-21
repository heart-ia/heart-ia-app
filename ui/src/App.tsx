import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from '@/pages/home';
import { AnalysePage } from '@/pages/analyse';
import { DatasetPage } from '@/pages/dataset';
import { PredictionPage } from '@/pages/prediction.tsx';

// Create a root route
const rootRoute = new RootRoute({
  component: () => (
    <SidebarProvider className="w-full min-w-full">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ),
});

// Create routes
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const analyseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/analyse',
  component: AnalysePage,
});

const datasetRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dataset',
  component: DatasetPage,
});

const predictionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/prediction',
  component: PredictionPage,
});

// Create the route tree using the routes
const routeTree = rootRoute.addChildren([
  homeRoute,
  analyseRoute,
  datasetRoute,
  predictionRoute,
]);

// Create the router using the route tree
const router = new Router({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
