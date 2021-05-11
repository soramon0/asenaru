import Head from 'next/head';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Asenaru</title>
        <meta name='description' content='A versatile shop' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Logo />
      <h1>Comming Soon!</h1>
    </div>
  );
}
