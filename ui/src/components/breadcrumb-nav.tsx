import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { Activity, Calculator, Database, Home } from 'lucide-react';
import * as React from 'react';

interface PathInfo {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pathnameRecord: Record<string, PathInfo> = {
  '/': {
    text: 'Accueil',
    icon: Home,
  },
  '/analyse': {
    text: 'Analyse',
    icon: Activity,
  },
  '/dataset': {
    text: 'Dataset',
    icon: Database,
  },
  '/prediction': {
    text: 'Prédiction',
    icon: Calculator,
  },
};

export function BreadcrumbNav() {
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.navigate({ to: '/' });
            }}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Heart-AI
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2">
            {currentPath in pathnameRecord ? (
              <>
                {React.createElement(pathnameRecord[currentPath].icon, {
                  className: 'h-4 w-4',
                })}
                {pathnameRecord[currentPath].text}
              </>
            ) : (
              <>
                <Home className="h-4 w-4" />
                Accueil
              </>
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
