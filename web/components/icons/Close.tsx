import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {};

const IconClose: React.VFC<Props> = (props) => {
  return (
    <svg
      className='h-7 w-7 cursor-pointer text-accents-9 hover:text-accents-6 dark:text-accents-4 dark:hover:text-accents-1'
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
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export default IconClose;
