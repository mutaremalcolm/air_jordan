import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })


interface LayoutProps {
    children: any,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            { children }
            <Footer />
        </div>
    )
}

export default Layout