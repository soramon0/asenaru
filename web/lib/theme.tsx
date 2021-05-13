import { createContext, useContext, useMemo, useState } from 'react';

type mode = 'light' | 'dark';

interface Context {
  mode: mode;
  setMode(mode: mode): void;
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

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode() {
        const newMode: mode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
      },
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
