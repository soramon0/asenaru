import useTheme from '@/lib/theme'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Page: React.FC = ({ children }) => {
  const { mode } = useTheme()

  return (
    <div className={mode}>
      <Navbar />
      <main className="mt-[122px] bg-primary-2 dark:bg-secondary-2 md:mt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Page
