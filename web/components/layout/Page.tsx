import useTheme from '@/lib/theme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Page: React.FC = ({ children }) => {
  const { mode } = useTheme();

  return (
    <div className={mode}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Page;
