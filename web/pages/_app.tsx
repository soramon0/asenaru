import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Formats, NextIntlProvider } from 'next-intl';

import '../styles/globals.css';
import { ThemeProvider } from '@/lib/theme';
import Page from '@/components/layout/Page';

const formats: Partial<Formats> = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <NextIntlProvider
      messages={pageProps.messages}
      locale={locale}
      formats={formats}
      now={new Date(pageProps.now)}
      // TODO(soramon0): add server timezone
      // timeZone="Austria/Vienna"
    >
      <ThemeProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
