import Link from 'next/link';
import { useTranslations } from 'use-intl';

import IconLogo from '@/components/icons/Logo';
import IconCart from '@/components/icons/Cart';
import IconHeart from '@/components/icons/Heart';
import NavbarLink from '@/components/layout/NavbarLink';
import NavbarSearch from '@/components/layout/NavbarSearch';

const Navbar = () => {
  const t = useTranslations('Navigation');

  return (
    <header className='p-4 bg-white sm:p-5'>
      <div className='max-w-screen-2xl mx-auto space-y-4'>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center space-x-4 md:flex-1'>
            <Link href='/'>
              <a aria-label={t('index').toString()}>
                <IconLogo className='h-8 w-8 transform hover:scale-110 transition duration-150 ease-in-out cursor-pointer' />
              </a>
            </Link>
            <div className='hidden space-x-3 sm:block'>
              <NavbarLink href='#'>{t('all')}</NavbarLink>
              <NavbarLink href='#'>{t('clothes')}</NavbarLink>
              <NavbarLink href='#'>{t('accessories')}</NavbarLink>
              <NavbarLink href='#'>{t('shoes')}</NavbarLink>
            </div>
          </div>

          <NavbarSearch showOn='large' />

          <div className='space-x-2 flex items-center sm:space-x-4 md:flex-1 md:justify-end'>
            <button type='button' aria-label={t('cartAriaLabel').toString()}>
              <IconCart className='h-7 w-7 text-gray-800 hover:text-gray-300 cursor-pointer' />
            </button>
            <NavbarLink href='#' aria-label={t('wishlist').toString()}>
              <IconHeart className='h-7 w-7 text-gray-800 hover:text-gray-300 cursor-pointer' />
            </NavbarLink>
            <button
              type='button'
              className='border border-white rounded-full focus:outline-none focus:border-black'
              aria-label={t('modalAriaLabel').toString()}
            >
              <div className='h-8 w-8 border-2 rounded-full border-white transition duration-150 bg-gradient-to-br from-green-200 via-indigo-400 to-purple-600 focus:outline-none hover:border-black focus:border-black' />
            </button>
          </div>
        </nav>

        <NavbarSearch showOn='small' />
      </div>
    </header>
  );
};

export default Navbar;
