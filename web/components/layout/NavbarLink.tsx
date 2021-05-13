import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import Link from 'next/link';

type Props = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string;
};

const NavbarLink: FC<Props> = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a
        className='text-gray-500 font-medium hover:text-gray-900 transition-colors duration-75 ease-out'
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavbarLink;
