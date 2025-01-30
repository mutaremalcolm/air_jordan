import React, { useState } from 'react';
import Menu from '../../../public/menu2.png';
import Image from 'next/image';
import Logo from '../../../public/airLogo.png';

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
        </div>
        
        
    </nav>
    </>
  )
}

export default Navbar