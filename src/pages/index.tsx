import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Loader from '@/components/Loader';
import AirData from '@/components/AirData';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  loading: any,
  ssr: boolean,
}

const Home: React.FC<HomeProps> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      <Head>
        <title>Air Jordan | Air Pollution Dashboard</title>
        <link rel='icon' href='/airLogo.png' sizes='any'/>
      </Head>
      <main className={`min-h-screen flex flex-col items-center justify-between p-16 overscroll-none z-10 ${inter.className}`}>
        <div
          id='data-container'
          className={`flex flex-col justify-center z-10 h-auto w-72 mt-auto mb-auto md:w-auto lg:justify-start max-w-2xl 2xl:max-w-[288px] 2xl:min-w-[288px] 
          ${loading ? '2xl:mr-none' : '2xl:mr-auto' // Conditional class based on loading state
          } `}
        >
          {loading ? (<Loader />) : (<AirData />)}
        </div>
      </main>
    </>
  )
}

export default Home;