import { FC } from 'react';
import Link from 'next/link';

interface Props {
  href: string;
}

const NavbarLink: FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors duration-75 ease-out sm:text-base'>
        {children}
      </a>
    </Link>
  );
};

export default NavbarLink;
