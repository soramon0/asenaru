import { SVGProps, VFC } from 'react';

type Props = SVGProps<SVGSVGElement> & {};

const IconHeart: VFC<Props> = (props) => {
  return (
    <svg
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      aria-hidden='true'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      />
    </svg>
  );
};

export default IconHeart;
