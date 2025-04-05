import { useState, useEffect } from 'react';

/**
 * Hook that tracks window scroll position
 * @returns An object containing the current scroll position and whether the user has scrolled
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setHasScrolled(currentScrollY > 10);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler right away to update initial state
    handleScroll();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, hasScrolled };
}