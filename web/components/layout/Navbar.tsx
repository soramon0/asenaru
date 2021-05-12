import Link from 'next/link';

import IconLogo from '@/components/icons/Logo';
import IconSearch from '@/components/icons/Search';
import IconCart from '@/components/icons/Cart';
import IconHeart from '@/components/icons/Heart';

const Nav = () => {
  return (
    <header className='p-2 bg-white sm:p-4'>
      <div className='max-w-screen-2xl mx-auto space-y-2 sm:space-y-4'>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center space-x-2 sm:space-x-6'>
            <Link href='/'>
              <IconLogo className='h-5 w-5 transform hover:scale-110 transition duration-150 ease-in-out cursor-pointer sm:h-6 sm:w-6' />
            </Link>
            <Link href='#'>
              <a className='text-gray-500 text-xs font-medium hover:text-gray-900 transition-colors duration-75 ease-out sm:text-base'>
                All
              </a>
            </Link>
            <Link href='#'>
              <a className='text-gray-500 text-xs font-medium hover:text-gray-900 transition-colors duration-75 ease-out sm:text-base'>
                Clothes
              </a>
            </Link>
            <Link href='#'>
              <a className='text-gray-500 text-xs font-medium hover:text-gray-900 transition-colors duration-75 ease-out sm:text-base'>
                Accessories
              </a>
            </Link>
            <Link href='#'>
              <a className='text-gray-500 text-xs font-medium hover:text-gray-900 transition-colors duration-75 ease-out sm:text-base'>
                Shoes
              </a>
            </Link>
          </div>

          <div className='relative hidden md:block md:flex-1 md:mx-16'>
            <label className='hidden' htmlFor='search'>
              Search
            </label>
            <input
              id='search'
              className='bg-gray-100 w-full py-2 pl-2 pr-7 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50'
              type='search'
              placeholder='Search for products'
            />
            <IconSearch className='w-5 h-5 absolute right-2 top-0 transform translate-y-1/2' />
          </div>

          <div className='space-x-2 flex items-center sm:space-x-4'>
            <Link href='#'>
              <IconCart className='h-5 w-5 text-gray-800 hover:text-gray-300 cursor-pointer sm:h-6 sm:w-6' />
            </Link>
            <Link href='#'>
              <IconHeart className='h-5 w-5 text-gray-800 hover:text-gray-300 cursor-pointer sm:h-6 sm:w-6' />
            </Link>
            <button className='border border-white rounded-full focus:outline-none focus:border-black'>
              <div className='h-5 w-5 border-2 rounded-full border-white transition duration-150 bg-gradient-to-br from-green-200 via-indigo-400 to-purple-600 focus:outline-none hover:border-black focus:border-black sm:h-7 sm:w-7' />
            </button>
          </div>
        </nav>

        <div className='relative md:hidden'>
          <label className='hidden' htmlFor='search'>
            Search
          </label>
          <input
            id='search'
            className='bg-gray-100 w-full py-2 pl-2 pr-7 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50'
            type='search'
            placeholder='Search for products'
          />
          <IconSearch className='w-5 h-5 absolute right-2 top-0 transform translate-y-1/2' />
        </div>
      </div>
    </header>
  );
};

export default Nav;
