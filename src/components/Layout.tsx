import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

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