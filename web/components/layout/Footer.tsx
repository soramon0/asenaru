import Link from 'next/link';
import { useTranslations } from 'use-intl';

import IconLogo from '@/components/icons/Logo';
import IconGithub from '@/components/icons/Github';
import DarkModeSwitch from '@/components/shared/DarkModeSwitch';
import LanguageSelector from '@/components/shared/LanguageSelector';

const Footer = () => {
  const t = useTranslations('Navigation');

  return (
    <footer className='px-4 py-6 space-y-8 bg-primary'>
      <div className='flex items-center space-x-3'>
        <Link href='/'>
          <a aria-label={t('index').toString()}>
            <IconLogo />
          </a>
        </Link>
        <span className='font-semibold uppercase'>Asenaru</span>
      </div>

      <ul className='flex flex-col space-y-3'>
        <li>
          <Link href='/'>{t('index')}</Link>
        </li>
        <li>
          <Link href='#'>Careers</Link>
        </li>
        <li>
          <Link href='#'>Blog</Link>
        </li>
        <li>
          <Link href='#'>About</Link>
        </li>
      </ul>

      <ul className='flex flex-col space-y-3'>
        <li>
          <Link href='#'>Terms of use</Link>
        </li>
        <li>
          <Link href='#'>Shipping &amp; Returns</Link>
        </li>
        <li>
          <Link href='#'>Privacy Policy</Link>
        </li>
      </ul>

      <div className='flex items-center space-x-6'>
        <Link href='https://github.com/soramon0/asenaru'>
          <a target='_blank' aria-label='project code'>
            <IconGithub />
          </a>
        </Link>
        <DarkModeSwitch />
        <LanguageSelector />
      </div>
    </footer>
  );
};

export default Footer;
