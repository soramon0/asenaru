import Link from 'next/link';
import { useTranslations } from 'use-intl';

import useTheme from '@/lib/theme';
import IconLogo from '@/components/icons/Logo';
import IconGithub from '@/components/icons/Github';
import LanguageSelector from '@/components/shared/LanguageSelector';

const Footer = () => {
  const t = useTranslations('Navigation');
  const { toggleMode } = useTheme();

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
      <div className='flex flex-col space-y-3'>
        <Link href='/'>
          <a>{t('index')}</a>
        </Link>
        <Link href='#'>
          <a>Careers</a>
        </Link>
        <Link href='#'>
          <a>Blog</a>
        </Link>
        <Link href='#'>
          <a>About</a>
        </Link>
      </div>
      <div className='flex flex-col space-y-3'>
        <Link href='#'>
          <a>Terms of use</a>
        </Link>
        <Link href='#'>
          <a>Shipping &amp; Returns</a>
        </Link>
        <Link href='#'>
          <a>Privacy Policy</a>
        </Link>
      </div>
      <div className='flex items-center space-x-6'>
        <Link href='https://github.com/soramon0/asenaru'>
          <a target='_blank' aria-label='project code'>
            <IconGithub />
          </a>
        </Link>

        <LanguageSelector />
        <button onClick={toggleMode}>Toggle dark mode</button>
      </div>
    </footer>
  );
};

export default Footer;
