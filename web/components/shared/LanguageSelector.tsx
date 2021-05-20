import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import Dropdown from '@/components/shared/Dropdown';
import IconFlag from '@/components/icons/Flag';

const LanguageSelector = () => {
  const { locales, locale, pathname } = useRouter();

  const selectLanguage = (language: string) => {
    if (language === locale) {
      return;
    }

    Cookies.set('NEXT_LOCALE', language);
    window.location.href = pathname;
  };

  return (
    <Dropdown
      items={locales || []}
      label={<IconFlag flag={locale || 'en'} />}
      onSelect={selectLanguage}
      selectorLabel='Change site language'
    />
  );
};

export default LanguageSelector;
