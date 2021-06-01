import { render } from '@testing-library/react'

import { ThemeProvider } from '@/lib/theme'
import IntlProvider from '@/lib/intl'
import getI18n from '@/lib/getI18n'

const Providers: React.FC = ({ children }) => {
  const data = getI18n('index')

  return (
    <ThemeProvider>
      <IntlProvider messages={data.messages} now={new Date(data.now)}>
        {children}
      </IntlProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: JSX.Element, options: any = {}): any =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
