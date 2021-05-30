import useTheme from '@/lib/theme';
import IconMoon from '@/components/icons/Moon';
import IconSun from '@/components/icons/Sun';

const DarkModeSwitch = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <>
      <label className='sr-only' id='darkModeLabel'>
        Switch to {mode} mode
      </label>
      <button
        onClick={toggleMode}
        className='p-1 bg-accents-8 border border-accents-2 rounded-full transition duration-150 hover:border-accents-9 focus:outline-none focus:border-accents-9 dark:border-accents-4 dark:hover:border-primary'
        aria-labelledby='darkModeLabel'
      >
        {mode === 'light' ? <IconMoon /> : <IconSun />}
      </button>
    </>
  );
};

export default DarkModeSwitch;
