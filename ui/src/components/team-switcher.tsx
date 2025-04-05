import logoImage from '@/assets/logo.png';
import { Link } from '@tanstack/react-router';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to="/">
          <SidebarMenuButton size="lg">
            <div className="bg-sidebar-accent text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
              <img src={logoImage} alt="Heart-AI Logo" className="size-8" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Heart-AI</span>
              <span className="truncate text-xs">Intelligence Artificielle</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
