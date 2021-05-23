import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type mode = 'light' | 'dark';

interface Context {
  mode: mode;
  toggleMode(): void;
}

const ThemeContext = createContext<Context | undefined>(undefined);

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<mode>('light');

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode');
    if (themeMode == 'light' || themeMode == 'dark') setMode(themeMode);
    else setMode('light');
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode() {
        const newMode: mode = mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newMode);
        setMode(newMode);
      },
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
