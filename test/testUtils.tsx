import { JSXElementConstructor, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import { ThemeProvider } from '@/lib/theme'
import IntlProvider from '@/lib/intl'
import getI18n from '@/lib/getI18n'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

interface Props {
  resetThemeMode?: boolean
  pageLocale?: string
}

const Providers: React.FC<Props> = (props) => {
  useRouter.mockImplementation(() => ({
    locale: 'en',
    locales: ['en', 'fr'],
    prefetch: () => new Promise(() => ({})),
  }))
  const data = getI18n(props.pageLocale || 'index')

  return (
    <ThemeProvider resetMode={props.resetThemeMode}>
      <IntlProvider messages={data.messages} now={new Date(data.now)}>
        {props.children}
      </IntlProvider>
    </ThemeProvider>
  )
}

type CustomRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: (RenderOptions & { wrapperProps: Props }) | Record<string, never>
) => RenderResult

const customRender: CustomRender = (ui, options = {}) => {
  return render(ui, {
    wrapper: (props) => <Providers {...props} {...options.wrapperProps} />,
    ...options,
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
