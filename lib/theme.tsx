import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Mode = 'light' | 'dark'

interface Context {
  mode: Mode
  toggleMode(): void
  getOppsiteMode(): Mode
  resetMode(): void
}

const ThemeContext = createContext<Context | undefined>(undefined)

export default function useTheme(): Context {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

interface Props {
  resetMode?: boolean
}

export const ThemeProvider: React.FC<Props> = ({ children, resetMode }) => {
  const [mode, setMode] = useState<Mode>('light')

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if (themeMode == 'light' || themeMode == 'dark') setMode(themeMode)
    else setMode('light')

    if (resetMode) {
      setMode('light')
    }
  }, [])

  const value = useMemo(
    () => ({
      mode,
      toggleMode() {
        const newMode = mode === 'light' ? 'dark' : 'light'
        localStorage.setItem('themeMode', newMode)
        setMode(newMode)
      },
      getOppsiteMode() {
        return mode === 'light' ? 'dark' : 'light'
      },
      resetMode() {
        setMode('light')
      },
    }),
    [mode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
