import Link from 'next/link';
import { useTranslations } from 'use-intl';

import IconLogo from '@/components/icons/Logo';
import IconGithub from '@/components/icons/Github';
import DarkModeSwitch from '@/components/shared/DarkModeSwitch';
import LanguageSelector from '@/components/shared/LanguageSelector';

const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='px-6 bg-primary dark:bg-accents-9'>
      <div className='space-y-8 py-12 md:space-y-0 md:flex'>
        <div className='space-y-8 md:space-y-0 md:flex md:flex-1 md:justify-between md:items-start'>
          <div className='flex items-center space-x-3'>
            <Link href='/'>
              <a aria-label={t('home').toString()}>
                <IconLogo />
              </a>
            </Link>
            <span className='font-semibold uppercase dark:text-accents-2 dark:hover:text-accents-3'>
              Asenaru
            </span>
          </div>

          <ul className='flex flex-col space-y-3'>
            <li className='hover:text-accents-6 dark:text-accents-4 dark:hover:text-accents-3'>
              <Link href='/'>{t('home')}</Link>
            </li>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('careers')}</Link>
            </li>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('blog')}</Link>
            </li>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('about')}</Link>
            </li>
          </ul>

          <ul className='flex flex-col space-y-3'>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('termsOfUse')}</Link>
            </li>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('shippingReturns')}</Link>
            </li>
            <li className='hover:text-accents-6 dark:text-accents-2 dark:hover:text-accents-3'>
              <Link href='#'>{t('privacyPolicy')}</Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-6 md:flex-1 md:justify-end md:items-start'>
          <Link href='https://github.com/soramon0/asenaru'>
            <a target='_blank' aria-label={t('githubAriaLabel').toString()}>
              <IconGithub />
            </a>
          </Link>
          <DarkModeSwitch />
          <LanguageSelector />
        </div>
      </div>

      <p className='text-center -mt-6 py-12 border-t dark:text-accents-2 dark:border-accents-6'>
        &copy; {currentYear} Sora.mon0, Inc. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
