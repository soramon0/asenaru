/* eslint react-hooks/exhaustive-deps: off */
import { useEffect, useRef, useState } from 'react'

import IconChevronDown from '@/components/icons/ChevronDown'
import IconChevronUp from '@/components/icons/ChevronUp'
import IconClose from '@/components/icons/Close'
import useKeyPress from '@/lib/useKeyPress'
import { useTranslations } from 'use-intl'

type Item = { value: string; label: string }
type ItemRef = { [key: number]: HTMLLIElement | null }
interface Props {
  items: Item[]
  label?: string | React.ReactNode
  icon?: React.ReactNode
  selectorLabel: string
  onSelect: (item: string) => void
}

const Dropdown: React.VFC<Props> = ({
  items,
  label,
  icon,
  selectorLabel,
  onSelect,
}) => {
  const t = useTranslations('Generic')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(-1)
  const itemRef = useRef<ItemRef>({})
  const selectorRef = useRef<HTMLUListElement | null>()
  const escapePress = useKeyPress('Escape')
  const downPress = useKeyPress('ArrowDown', true)
  const upPress = useKeyPress('ArrowUp', true)
  const enterPress = useKeyPress('Enter')
  const spacePress = useKeyPress(' ')

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen)
    setSelectedItem(-1)
  }

  const select = (item: string) => {
    onSelect(item)
    toggleDropDown()
  }

  useEffect(() => {
    if (escapePress && dropdownOpen) {
      toggleDropDown()
    }
  }, [escapePress])

  useEffect(() => {
    if (downPress && dropdownOpen) {
      if (!items.length) return

      if (selectedItem < 0 || selectedItem >= items.length - 1) {
        setSelectedItem(0)
        return
      }

      if (selectedItem >= 0) {
        setSelectedItem((item) => item + 1)
      }
    }
  }, [downPress])

  useEffect(() => {
    if (upPress && dropdownOpen) {
      if (!items.length) return

      if (selectedItem <= 0) {
        setSelectedItem(items.length - 1)
        return
      }

      if (selectedItem > 0) {
        setSelectedItem((item) => item - 1)
      }
    }
  }, [upPress])

  useEffect(() => {
    itemRef.current[selectedItem]?.focus()
  }, [selectedItem])

  useEffect(() => {
    if (dropdownOpen && (enterPress || spacePress)) {
      const item = itemRef.current[selectedItem]

      if (!item) {
        const activeElement = document.activeElement

        if (activeElement?.parentElement?.id == 'selectorMenu') {
          const text = activeElement.getAttribute('data-value')
          if (!text) return

          select(text)
        }

        return
      }

      const text = item.dataset.value
      if (!text) return

      select(text)
    }
  }, [enterPress, spacePress])

  useEffect(() => {
    function onOutsideClickCloseDropdown({ target }: MouseEvent) {
      const isOutsideDropdown =
        selectorRef.current !== target &&
        !selectorRef.current?.contains(target as Node)
      if (dropdownOpen && isOutsideDropdown) {
        if (dropdownOpen) {
          toggleDropDown()
        }
      }
    }

    if (dropdownOpen) {
      window.addEventListener('click', onOutsideClickCloseDropdown)
    }

    return () => {
      window.removeEventListener('click', onOutsideClickCloseDropdown)
    }
  }, [dropdownOpen])

  return (
    <div className="relative text-left rounded-md">
      <button
        type="button"
        className="w-full px-4 py-2 flex items-center justify-center space-x-3 text-sm font-medium rounded-md border border-accents-6 shadow-sm bg-primary text-accents-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:bg-accents-7"
        data-testid="selector"
        aria-haspopup="listbox"
        aria-label={selectorLabel}
        onClick={toggleDropDown}
      >
        {label && <span>{label}</span>}
        {icon && icon}
        {!icon && dropdownOpen ? <IconChevronDown /> : <IconChevronUp />}
      </button>

      {dropdownOpen && (
        <ul
          ref={(el) => (selectorRef.current = el)}
          id="selectorMenu"
          className="w-full py-1 h-full fixed mt-28 inset-0 z-20 lowercase shadow-magical border border-accents-2 bg-primary md:w-40 md:h-auto md:mt-3 md:absolute md:inset-auto md:right-0 dark:bg-accents-8 dark:border-accents-5"
          role="listbox"
          aria-expanded={dropdownOpen}
        >
          <li className="mt-1 px-4 py-2 text-right md:hidden">
            <button
              onClick={toggleDropDown}
              aria-label={t('closeDropdown').toString()}
              data-testid="selectorCloser"
            >
              <IconClose />
            </button>
          </li>
          {items.map((item, i) => (
            <li
              className="px-4 py-2 capitalize font-medium tracking-wide cursor-pointer hover:bg-accents-1 focus:outline-none focus:bg-accents-1 dark:text-accents-3 dark:hover:bg-accents-7 dark:focus:bg-accents-7"
              key={item.value + i}
              role="option"
              tabIndex={0}
              onClick={() => select(item.value)}
              ref={(el) => (itemRef.current[i] = el)}
              data-value={item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
