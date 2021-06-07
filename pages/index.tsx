import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, NextPage } from 'next'
import { useTranslations } from 'use-intl'

import { Product } from '@/types/models'
import { products as data } from '@/data/products'
import getI18n from '@/lib/getI18n'
import ProductCard from '@/components/shared/ProductCard'
import Marquee from '@/components/shared/Marquee'

interface Props {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  const t = useTranslations('Index')

  return (
    <>
      <Head>
        <title>Asenaru - {t('title')}</title>
        <meta name="description" content={t('meta.description').toString()} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-wrap md:h-[calc(100vh-80px)]">
        {products.slice(0, 1).map((product) => (
          <div key={product.id} className="md:w-2/3 h-full">
            <ProductCard product={product} color="bg-violet" />
          </div>
        ))}

        <div className="md:w-1/3 md:h-1/2">
          {products.slice(1).map((product, i) => (
            <div key={product.id} className="md:h-full">
              <ProductCard
                product={product}
                color={i === 0 ? 'bg-secondary-2' : 'bg-pink'}
              />
            </div>
          ))}
        </div>
      </section>

      <Marquee background="bg-secondary">
        {products.map((product) => (
          <a href="#" key={product.id} className="h-full w-80 relative">
            <div className="w-full -ml-4 -mt-4 text-right absolute top-1/2 z-10">
              <h3 className="inline-block p-2 text-2xl font-bold tracking-wide text-accents-1 bg-secondary">
                {product.name}
              </h3>
            </div>
            <Image
              src={product.image}
              width="320"
              height="320"
              alt={product.name + '-' + product.id}
            />
          </a>
        ))}
      </Marquee>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...getI18n('index', locale),
      products: data,
    },
  }
}
