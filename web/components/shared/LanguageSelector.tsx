import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import IconChevronDown from '@/components/icons/ChevronDown';

const LanguageSelector = () => {
  const { locales, locale, pathname } = useRouter();
  const [show, setShow] = useState(false);

  const toggleDropDown = () => {
    setShow(!show);
  };

  const selectLanguage = (language: string) => {
    if (language === locale) {
      toggleDropDown();
      return;
    }

    Cookies.set('NEXT_LOCALE', language);
    window.location.href = pathname;
  };

  const onEscapeCloseDropdown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      setShow(false);
    }
  };

  function onOutsideClickCloseDropdown() {
    // TODO(soramon0): dont close if we click inside the dropdown
    if (show) {
      toggleDropDown();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscapeCloseDropdown);
    return () => {
      document.removeEventListener('keydown', onEscapeCloseDropdown);
    };
  }, []);

  useEffect(() => {
    if (show) {
      document.addEventListener('click', onOutsideClickCloseDropdown);
    }

    return () => {
      document.removeEventListener('click', onOutsideClickCloseDropdown);
    };
  }, [show]);

  return (
    <div className='relative text-left rounded-md'>
      <label className='sr-only' id='languageSelectorLabel'>
        Change site language
      </label>
      <button
        type='button'
        className='w-full px-4 py-2 flex items-center justify-center space-x-3 text-sm font-medium rounded-md border border-accents-6 shadow-sm bg-primary text-accents-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        id='languageSelector'
        aria-haspopup='listbox'
        aria-labelledby='languageSelectorLabel'
        onClick={toggleDropDown}
      >
        <span>Options</span>
        <IconChevronDown />
      </button>

      {show && (
        <ul
          id='languageSelectorMenu'
          className='w-40 mt-2 absolute right-0 lowercase shadow-md border border-accents-2 bg-primary'
          role='listbox'
          aria-expanded={show}
        >
          {locales?.map((locale) => (
            <li
              className='px-4 py-2 cursor-pointer hover:bg-accents-1 focus:outline-none focus:bg-accents-1'
              key={locale}
              role='option'
              tabIndex={0}
              onClick={() => selectLanguage(locale)}
            >
              {locale}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
