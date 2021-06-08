import Image from 'next/image'
import { useTranslations } from 'use-intl'

import IconHeart from '@/components/icons/Heart'
import { Product } from '@/types/models'

interface Props {
  product: Product
  color?: 'bg-violet' | 'bg-secondary-2' | 'bg-pink'
  variant?: 'slim' | 'simple'
}

const ProductCard: React.VFC<Props> = ({ product, color, variant }) => {
  const t = useTranslations('Product')
  const productNameID = product.name.replace(' ', '-').toLocaleLowerCase()

  const getBGColor = () => {
    switch (color) {
      case 'bg-violet':
        return 'group-hover:bg-violet'
      case 'bg-pink':
        return 'group-hover:bg-pink'
      case 'bg-secondary-2':
        return 'group-hover:bg-secondary-2'
      default:
        return ''
    }
  }

  if (variant === 'slim') {
    return (
      <a href="#" key={product.id} className="h-full w-full relative md:w-80">
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
    )
  }

  return (
    <article
      className={`w-full h-full relative group overflow-hidden ${color}`}
    >
      <div className="absolute z-10 top-0 left-0">
        <h3
          className={`px-4 py-3 text-3xl font-bold tracking-wide bg-primary transition duration-500 ease-in-out ${getBGColor()} group-hover:text-primary-2 md:px-8 md:py-5 md:text-2xl xl:px-6 xl:text-3xl`}
          id={productNameID}
        >
          {product.name}
        </h3>
        <span
          className={`inline-block px-4 py-3 font-medium tracking-wide text-center bg-primary transition duration-500 ease-in-out ${getBGColor()} group-hover:text-primary-2 md:px-6 md:py-4 md:text-md`}
        >
          {product.price} USD
        </span>
      </div>
      <button
        className={`absolute z-10 top-0 right-0 p-2 bg-primary transition duration-500 ease-in-out ${getBGColor()}`}
        aria-label={t('wishlistAddLabel').toString()}
      >
        <IconHeart className="h-7 w-7 group-hover:text-primary-2" />
      </button>
      <a
        href={`/product/${product.id}`}
        className="w-full h-full group inline-block bg-pattern-product transition-transform delay-150 duration-700 ease-in-out transform group-hover:scale-[98%]"
        aria-labelledby={productNameID}
      >
        <div className="h-full w-full transition-transform delay-150 duration-700 ease-in-out transform group-hover:scale-110 group-focus:scale-110">
          <Image
            src={product.image}
            alt={product.name}
            width={1280}
            height={1280}
          />
        </div>
      </a>
    </article>
  )
}

export default ProductCard
