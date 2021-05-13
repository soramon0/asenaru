import useTheme from '@/lib/theme';

const Footer = () => {
  const { toggleMode } = useTheme();
  return (
    <footer className='text-center p-4'>
      <button onClick={toggleMode}>Toggle dark mode</button>
    </footer>
  );
};

export default Footer;
