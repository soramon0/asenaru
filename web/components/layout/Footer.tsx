import Link from 'next/link';
import { useTranslations } from 'use-intl';

import IconLogo from '@/components/icons/Logo';
import IconGithub from '@/components/icons/Github';
import DarkModeSwitch from '@/components/shared/DarkModeSwitch';
import LanguageSelector from '@/components/shared/LanguageSelector';

const Footer = () => {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='px-6 bg-primary'>
      <div className='space-y-8 py-12 md:space-y-0 md:flex'>
        <div className='space-y-8 md:space-y-0 md:flex md:flex-1 md:justify-between md:items-start'>
          <div className='flex items-center space-x-3'>
            <Link href='/'>
              <a aria-label={t('index').toString()}>
                <IconLogo />
              </a>
            </Link>
            <span className='font-semibold uppercase'>Asenaru</span>
          </div>

          <ul className='flex flex-col space-y-3'>
            <li className='hover:text-accents-6'>
              <Link href='/'>{t('index')}</Link>
            </li>
            <li className='hover:text-accents-6'>
              <Link href='#'>Careers</Link>
            </li>
            <li className='hover:text-accents-6'>
              <Link href='#'>Blog</Link>
            </li>
            <li className='hover:text-accents-6'>
              <Link href='#'>About</Link>
            </li>
          </ul>

          <ul className='flex flex-col space-y-3'>
            <li className='hover:text-accents-6'>
              <Link href='#'>Terms of use</Link>
            </li>
            <li className='hover:text-accents-6'>
              <Link href='#'>Shipping &amp; Returns</Link>
            </li>
            <li className='hover:text-accents-6'>
              <Link href='#'>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-6 md:flex-1 md:justify-end md:items-start'>
          <Link href='https://github.com/soramon0/asenaru'>
            <a target='_blank' aria-label='project code'>
              <IconGithub />
            </a>
          </Link>
          <DarkModeSwitch />
          <LanguageSelector />
        </div>
      </div>

      <p className='text-center -mt-6 py-12 border-t'>
        &copy; {currentYear} Sora.mon0, Inc. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
