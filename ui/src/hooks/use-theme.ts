import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

function setAgGridDarkMode(enabled: boolean) {
  document.body.dataset.agThemeMode = enabled ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    // Check if user has a system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // Return stored theme or system preference or default to light
    return storedTheme || (prefersDark ? 'dark' : 'light');
  });

  // Update the DOM when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the previous theme class
    root.classList.remove('dark', 'light');

    // Add the new theme class
    root.classList.add(theme);

    // Store the theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  setAgGridDarkMode(theme === 'dark');
  return { theme, toggleTheme };
}
