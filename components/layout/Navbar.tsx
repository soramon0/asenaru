import Link from 'next/link'
import { useTranslations } from 'use-intl'

import IconLogo from '@/components/icons/Logo'
import IconCart from '@/components/icons/Cart'
import IconHeart from '@/components/icons/Heart'
import NavbarLink from '@/components/layout/NavbarLink'
import NavbarSearch from '@/components/layout/NavbarSearch'

const Navbar: React.VFC = () => {
  const t = useTranslations('Navigation')

  return (
    <header className="w-full p-4 bg-primary fixed top-0 z-20 dark:bg-accents-9 sm:p-5">
      <div className="max-w-screen-2xl mx-auto space-y-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-4 md:flex-1">
            <Link href="/">
              <a aria-label={t('index').toString()}>
                <IconLogo />
              </a>
            </Link>
            <div className="hidden space-x-3 sm:block">
              <NavbarLink href="#">{t('all')}</NavbarLink>
              <NavbarLink href="#">{t('clothes')}</NavbarLink>
              <NavbarLink href="#">{t('accessories')}</NavbarLink>
              <NavbarLink href="#">{t('shoes')}</NavbarLink>
            </div>
          </div>

          <NavbarSearch showOn="large" />

          <div className="space-x-3 flex items-center sm:space-x-4 md:flex-1 md:justify-end">
            <button type="button" aria-label={t('cartAriaLabel').toString()}>
              <IconCart />
            </button>
            <NavbarLink href="#" aria-label={t('wishlist').toString()}>
              <IconHeart />
            </NavbarLink>
            <button
              type="button"
              className="border rounded-full border-primary focus:outline-none focus:border-secondary dark:border-accents-8 dark:focus:border-primary"
              aria-label={t('modalAriaLabel').toString()}
            >
              <div className="h-8 w-8 border-2 rounded-full border-primary hover:border-secondary transition duration-150 bg-gradient-to-br from-cyan to-violet-light focus:outline-none focus:border-secondary dark:border-accents-8 dark:hover:border-primary dark:focus:border-primary" />
            </button>
          </div>
        </nav>

        <NavbarSearch showOn="small" />
      </div>
    </header>
  )
}

export default Navbar
