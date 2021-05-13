import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Formats, NextIntlProvider } from 'next-intl';

import '../styles/globals.css';

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
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}

export default MyApp;
