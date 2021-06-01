import Image from 'next/image'

import IconHeart from '@/components/icons/Heart'

const ProductCard: React.VFC = () => {
  const productNameID = 'product-lightwieght-jacket'

  return (
    <article className="w-full h-full relative group overflow-hidden bg-violet-light">
      <div className="absolute z-10 top-0 left-0">
        <h3
          className="p-3 text-2xl font-bold tracking-wide bg-primary transition duration-500 ease-in-out group-hover:bg-violet group-hover:text-primary-2 md:px-4 md:py-5 md:text-4xl"
          id={productNameID}
        >
          Lightwieght Jacket
        </h3>
        <span className="inline-block px-4 py-3 font-medium tracking-wide text-center bg-primary transition duration-500 ease-in-out group-hover:bg-violet group-hover:text-primary-2 md:px-6 md:py-4 md:text-md">
          249.99 USD
        </span>
      </div>
      <button className="absolute z-10 top-0 right-0 p-2 bg-primary transition duration-500 ease-in-out group-hover:bg-violet">
        <IconHeart className="h-7 w-7 group-hover:text-primary-2" />
      </button>
      <a
        href="/product/jacket"
        className="w-full h-full group inline-block bg-pattern-product transition-transform delay-150 duration-700 ease-in-out transform group-hover:scale-[98%]"
        aria-labelledby={productNameID}
      >
        <div className="h-full w-full transition-transform delay-150 duration-700 ease-in-out transform group-hover:scale-110 group-focus:scale-110">
          <Image
            src="/jacket.png"
            width={1280}
            height={1280}
            alt="black lightwieght jacket"
          />
        </div>
      </a>
    </article>
  )
}

export default ProductCard
