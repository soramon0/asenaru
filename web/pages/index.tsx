import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className='bg-gray-50 h-screen'>
      <Head>
        <title>Asenaru</title>
        <meta name='description' content='A versatile shop' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
    </div>
  );
}
