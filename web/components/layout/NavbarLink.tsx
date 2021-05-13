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
        className='text-accents-6 font-medium hover:text-primary transition-colors duration-75 ease-out'
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavbarLink;
