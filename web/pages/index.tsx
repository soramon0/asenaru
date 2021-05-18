import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'use-intl';

import getI18n from '@/lib/getI18n';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <>
      <Head>
        <title>Asenaru - {t('title')}</title>
        <meta name='description' content={t('meta.description').toString()} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-72 p-8 bg-primary-2 dark:bg-secondary-2'>
        <h1 className='text-4xl font-semibold text-center text-primary dark:text-primary-2'>
          Coming Soon!
        </h1>
      </main>
    </>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...getI18n('index', locale),
    },
  };
}
