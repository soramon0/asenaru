import { SVGProps, VFC } from 'react'

type Props = SVGProps<SVGSVGElement>

const IconLogo: VFC<Props> = (props) => {
  return (
    <svg
      className="h-8 w-8 cursor-pointer transform hover:scale-110 transition duration-150 ease-in-out"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <rect width="100%" height="100%" rx="16"></rect>
      <path
        className="text-secondary"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      ></path>
    </svg>
  )
}

export default IconLogo
