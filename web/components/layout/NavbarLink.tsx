import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import Link from 'next/link'

type Props = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string
}

const NavbarLink: FC<Props> = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a
        className="font-medium text-accents-6 hover:text-primary transition-colors duration-75 ease-out dark:text-accents-5 dark:hover:text-accents-3"
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default NavbarLink
