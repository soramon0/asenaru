import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslations } from 'use-intl'

import getI18n from '@/lib/getI18n'
import ProductCard from '@/components/shared/ProductCard'

export default function Home(): JSX.Element {
  const t = useTranslations('Index')

  return (
    <>
      <Head>
        <title>Asenaru - {t('title')}</title>
        <meta name="description" content={t('meta.description').toString()} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div className="md:w-2/3 lg:h-[calc(100vh-80px)]">
          <ProductCard />
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...getI18n('index', locale),
    },
  }
}
