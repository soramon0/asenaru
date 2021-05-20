import { useEffect, useRef, useState } from 'react';

import IconChevronDown from '@/components/icons/ChevronDown';
import IconChevronUp from '@/components/icons/ChevronUp';
import useKeyPress from '@/lib/useKeyPress';

interface Props {
  items: string[];
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  selectorLabel: string;
  onSelect: (item: string) => void;
}
type ItemRef = { [key: number]: HTMLLIElement | null };

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
          const text = activeElement.textContent;
          if (!text) return;

          select(text);
        }

        return;
      }

      const text = item.textContent;
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
          className='w-40 mt-2 absolute right-0 lowercase shadow-md border border-accents-2 bg-primary'
          role='listbox'
          aria-expanded={dropdownOpen}
        >
          {items.map((item, i) => (
            <li
              className='px-4 py-2 cursor-pointer hover:bg-accents-1 focus:outline-none focus:bg-accents-1'
              key={item + i}
              role='option'
              tabIndex={0}
              onClick={() => select(item)}
              ref={(el) => (itemRef.current[i] = el)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
