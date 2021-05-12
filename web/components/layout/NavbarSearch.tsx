import { FC } from 'react';

import IconSearch from '@/components/icons/Search';

interface Props {
  showOn: 'large' | 'small';
}

const NavbarSearch: FC<Props> = ({ showOn }) => {
  const onLarge = 'hidden sm:ml-4 xl:ml-0 md:block md:flex-1';
  const onSmall = 'block md:hidden';

  return (
    <div className={`relative ${showOn === 'large' ? onLarge : onSmall}`}>
      <label className='hidden' htmlFor='search'>
        Search
      </label>
      <input
        id='search'
        name='search'
        className='bg-gray-100 w-full py-2 pl-2 pr-7 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50'
        type='search'
        placeholder='Search for products'
      />
      <IconSearch className='w-5 h-5 absolute right-2 top-0 transform translate-y-1/2' />
    </div>
  );
};

export default NavbarSearch;
