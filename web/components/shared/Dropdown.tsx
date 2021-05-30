import { useEffect, useRef, useState } from 'react';

import IconChevronDown from '@/components/icons/ChevronDown';
import IconChevronUp from '@/components/icons/ChevronUp';
import IconClose from '@/components/icons/Close';
import useKeyPress from '@/lib/useKeyPress';

type Item = { value: string; label: string };
type ItemRef = { [key: number]: HTMLLIElement | null };
interface Props {
  items: Item[];
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  selectorLabel: string;
  onSelect: (item: string) => void;
}

const Dropdown: React.VFC<Props> = ({
  items,
  label,
  icon,
  selectorLabel,
  onSelect,
}) => {
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

  const select = (item: string) => {
    onSelect(item);
    toggleDropDown();
  };

  useEffect(() => {
    if (escapePress && dropdownOpen) {
      toggleDropDown();
    }
  }, [escapePress]);

  useEffect(() => {
    if (downPress && dropdownOpen) {
      if (!items.length) return;

      if (selectedItem < 0 || selectedItem >= items.length - 1) {
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
      if (!items.length) return;

      if (selectedItem <= 0) {
        setSelectedItem(items.length - 1);
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

      if (!item) {
        const activeElement = document.activeElement;

        if (activeElement?.parentElement?.id == 'selectorMenu') {
          const text = activeElement.getAttribute('data-locale');
          if (!text) return;

          select(text);
        }

        return;
      }

      const text = item.dataset.locale;
      if (!text) return;

      select(text);
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
      <label className='sr-only' id='selectorLabel'>
        {selectorLabel}
      </label>
      <button
        type='button'
        className='w-full px-4 py-2 flex items-center justify-center space-x-3 text-sm font-medium rounded-md border border-accents-6 shadow-sm bg-primary text-accents-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        id='selector'
        aria-haspopup='listbox'
        aria-labelledby='selectorLabel'
        onClick={toggleDropDown}
      >
        <span>{label}</span>
        {icon && icon}
        {!icon && dropdownOpen ? <IconChevronDown /> : <IconChevronUp />}
      </button>

      {dropdownOpen && (
        <ul
          id='selectorMenu'
          className='w-full h-full fixed mt-28 inset-0 lowercase shadow-magical border border-accents-2 bg-primary md:w-40 md:h-auto md:mt-3 md:absolute md:inset-auto md:right-0'
          role='listbox'
          aria-expanded={dropdownOpen}
        >
          <li className='mt-1 px-4 py-2 text-right md:hidden'>
            <label className='sr-only' id='selectorCloser'>
              Close Dropdown
            </label>
            <button onClick={toggleDropDown} aria-labelledby='selectorCloser'>
              <IconClose />
            </button>
          </li>
          {items.map((item, i) => (
            <li
              className='px-4 py-2 capitalize font-medium cursor-pointer hover:bg-accents-1 focus:outline-none focus:bg-accents-1'
              key={item.value + i}
              role='option'
              tabIndex={0}
              onClick={() => select(item.value)}
              ref={(el) => (itemRef.current[i] = el)}
              data-locale={item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
