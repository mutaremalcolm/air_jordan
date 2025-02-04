import React, { useState } from 'react';
import Menu from '../../../public/menu2.png';
import Image from 'next/image';
import Logo from '../../../public/airLogo.png';
import AboutModal from './AboutModal';

interface NavBarProps {
    //types
}


const Navbar: React.FC<NavBarProps> = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

  return (
    <>
    <nav className='bg-gray-900 absolute w-full z-30 shadow-[rgba(0, 0, 0, 0.4)_0px_1px_10px]'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10 relative'>
            <a href='#' className='flex items-center'>
                <Image src={Logo} width={30} height={30} className='h-10 mr-3 w-10' alt='logo'/>
                <span className='hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>AIR JORDAN</span>
            </a>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto 2xl:flex 2xl:p-2`} id='navbar-default' >
                <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                    <li><AboutModal /></li>
                </ul>
            </div>
        </div>     
    </nav>
    </>
  )
}

export default Navbar