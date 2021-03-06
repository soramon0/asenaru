import { useTranslations } from 'use-intl'

import useTheme from '@/lib/theme'
import IconMoon from '@/components/icons/Moon'
import IconSun from '@/components/icons/Sun'

const DarkModeSwitch: React.VFC = () => {
  const t = useTranslations('Generic')
  const { mode, toggleMode, getOppsiteMode } = useTheme()
  const label = t('darkModeLabel', { mode: getOppsiteMode() }).toString()

  return (
    <button
      onClick={toggleMode}
      className="p-1 bg-accents-7 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary"
      aria-label={label}
      data-testid="dark-mode-switch"
    >
      {mode === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  )
}

export default DarkModeSwitch
