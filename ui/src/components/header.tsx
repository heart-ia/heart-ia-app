import { useScroll } from '@/hooks/use-scroll';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/libs/utils';

export function Header() {
  const { hasScrolled } = useScroll();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 transition-all duration-200 ease-in-out',
        'bg-background/80 backdrop-blur-sm',
        hasScrolled ? 'bg-background/70 shadow-sm' : 'bg-background/95',
      )}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbNav />
      </div>
      <div className="flex items-center gap-2 px-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
