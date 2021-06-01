import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {}

const IconMoon: React.VFC<Props> = (props) => {
  return (
    <svg
      className="h-7 w-7 cursor-pointer text-accents-2 hover:text-accents-6 dark:text-accents-4 dark:hover:text-accents-1"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

export default IconMoon
