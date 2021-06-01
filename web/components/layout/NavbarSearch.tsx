import { FC } from 'react'
import { useTranslations } from 'use-intl'

import IconSearch from '@/components/icons/Search'

interface Props {
  showOn: 'large' | 'small'
}

const NavbarSearch: FC<Props> = ({ showOn }) => {
  const t = useTranslations('Navigation')

  const onLarge = 'hidden sm:ml-4 xl:ml-0 md:block md:flex-1'
  const onSmall = 'block md:hidden'

  return (
    <div
      className={`relative md:-mr-10 ${showOn === 'large' ? onLarge : onSmall}`}
    >
      <label className="hidden" htmlFor="navbarSearch">
        {t('searchLabel')}
      </label>
      <input
        id="navbarSearch"
        name="search"
        className="w-full py-2 pl-2 pr-7 bg-accents-1 focus:outline-none focus:ring-4 focus:ring-accents-2 focus:ring-opacity-10 dark:bg-accents-7 dark:text-secondary dark:focus:ring-accents-8"
        type="search"
        placeholder={t('searchPlaceholder').toString()}
      />
      <IconSearch className="w-5 h-5 absolute right-3 top-0 transform translate-y-1/2 dark:text-accents-2" />
    </div>
  )
}

export default NavbarSearch
