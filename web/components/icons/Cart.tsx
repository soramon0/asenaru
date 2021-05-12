import { SVGProps, VFC } from 'react';

type Props = SVGProps<SVGSVGElement> & {};

const IconCart: VFC<Props> = (props) => {
  return (
    <svg
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
      />
    </svg>
  );
};

export default IconCart;
