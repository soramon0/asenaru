import { AppProps } from 'next/app'

import '../styles/globals.css'
import IntlProvider from '@/lib/intl'
import { ThemeProvider } from '@/lib/theme'
import Page from '@/components/layout/Page'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <IntlProvider messages={pageProps.messages} now={pageProps.now}>
      <ThemeProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default MyApp
