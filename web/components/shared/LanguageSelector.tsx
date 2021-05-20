import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import IconChevronDown from '@/components/icons/ChevronDown';
import useKeyPress from '@/lib/useKeyPress';

type ItemRef = { [key: number]: HTMLLIElement | null };

const LanguageSelector = () => {
  const { locales, locale, pathname } = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);
  const itemRef = useRef<ItemRef>({});
  const escapePress = useKeyPress('Escape');
  const downPress = useKeyPress('ArrowDown', true);
  const upPress = useKeyPress('ArrowUp', true);
  const enterPress = useKeyPress('Enter');
  const spacePress = useKeyPress(' ');

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
    setSelectedItem(-1);
  };

  const selectLanguage = (language: string) => {
    if (language === locale) {
      toggleDropDown();
      return;
    }

    Cookies.set('NEXT_LOCALE', language);
    window.location.href = pathname;
  };

  useEffect(() => {
    if (escapePress && dropdownOpen) {
      toggleDropDown();
    }
  }, [escapePress]);

  useEffect(() => {
    if (downPress && dropdownOpen) {
      if (!locales?.length) return;

      if (selectedItem < 0 || selectedItem >= locales.length - 1) {
        setSelectedItem(0);
        return;
      }

      if (selectedItem >= 0) {
        setSelectedItem((item) => item + 1);
      }
    }
  }, [downPress]);

  useEffect(() => {
    if (upPress && dropdownOpen) {
      if (!locales?.length) return;

      if (selectedItem <= 0) {
        setSelectedItem(locales.length - 1);
        return;
      }

      if (selectedItem > 0) {
        setSelectedItem((item) => item - 1);
      }
    }
  }, [upPress]);

  useEffect(() => {
    itemRef.current[selectedItem]?.focus();
  }, [selectedItem]);

  useEffect(() => {
    if (dropdownOpen && (enterPress || spacePress)) {
      const item = itemRef.current[selectedItem];
      if (!item) return;

      const language = item.textContent;
      if (!language) return;

      selectLanguage(language);
    }
  }, [enterPress, spacePress]);

  useEffect(() => {
    function onOutsideClickCloseDropdown() {
      // TODO(soramon0): dont close if we click inside the dropdown
      if (dropdownOpen) {
        toggleDropDown();
      }
    }

    if (dropdownOpen) {
      document.addEventListener('click', onOutsideClickCloseDropdown);
    }

    return () => {
      document.removeEventListener('click', onOutsideClickCloseDropdown);
    };
  }, [dropdownOpen]);

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

      {dropdownOpen && (
        <ul
          id='languageSelectorMenu'
          className='w-40 mt-2 absolute right-0 lowercase shadow-md border border-accents-2 bg-primary'
          role='listbox'
          aria-expanded={dropdownOpen}
        >
          {locales?.map((locale, i) => (
            <li
              className='px-4 py-2 cursor-pointer hover:bg-accents-1 focus:outline-none focus:bg-accents-1'
              key={locale}
              role='option'
              tabIndex={0}
              onClick={() => selectLanguage(locale)}
              ref={(el) => (itemRef.current[i] = el)}
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
