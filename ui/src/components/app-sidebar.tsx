import * as React from 'react';
import { Activity, CalculatorIcon, Database, Home } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Accueil',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Prediction',
      url: '/prediction',
      icon: CalculatorIcon,
      isActive: true,
    },

    {
      title: 'Analyse',
      url: '/analyse',
      icon: Activity,
    },
    {
      title: 'Dataset',
      url: '/dataset',
      icon: Database,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
