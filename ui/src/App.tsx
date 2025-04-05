import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Outlet, 
  RouterProvider, 
  Router,
  Route, 
  RootRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { HomePage } from '@/pages/home';
import { AnalysePage } from '@/pages/analyse';

// Breadcrumb component that uses router hooks
function BreadcrumbNav() {
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/" onClick={(e) => {
            e.preventDefault();
            router.navigate({ to: '/' });
          }}>
            Heart-AI
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {currentPath === "/" ? "Accueil" : "Analyse"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Create a root route
const rootRoute = new RootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
          <div className="flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>
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

// Create the route tree using the routes
const routeTree = rootRoute.addChildren([homeRoute, analyseRoute]);

// Create the router using the route tree
const router = new Router({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
