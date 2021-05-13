import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'use-intl';

import getI18n from '@/lib/getI18n';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className='bg-gray-50 h-screen'>
      <Head>
        <title>Asenaru - {t('title')}</title>
        <meta name='description' content={t('meta.description').toString()} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
    </div>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...getI18n('index', locale),
    },
  };
}
