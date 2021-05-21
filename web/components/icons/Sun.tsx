import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {};

const IconSun: React.VFC<Props> = (props) => {
  return (
    <svg
      className='h-7 w-7 cursor-pointer text-accents-9 hover:text-accents-6 dark:text-accents-4 dark:hover:text-accents-1'
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
        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
      />
    </svg>
  );
};

export default IconSun;
