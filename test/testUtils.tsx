import { JSXElementConstructor, ReactElement } from 'react'
import {
  render,
  fireEvent,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'

import { ThemeProvider } from '@/lib/theme'
import IntlProvider from '@/lib/intl'
import getI18n from '@/lib/getI18n'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

interface Props {
  resetThemeMode?: boolean
  pageLocale?: string
  locale?: 'en' | 'fr'
}

const Providers: React.FC<Props> = (props) => {
  const locale = props.locale || 'en'
  useRouter.mockImplementation(() => ({
    locale,
    locales: ['en', 'fr'],
    pathname: '/',
    prefetch: () => new Promise(() => ({})),
  }))
  const data = getI18n(props.pageLocale || 'index', locale)

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

export function pressKey(key: string, times = 1): void {
  for (let i = 0; i < times; i++) {
    fireEvent.keyDown(document.body, { key })
    fireEvent.keyUp(document.body, { key })
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
