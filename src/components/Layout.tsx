import React from 'react';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
    children: any,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            { children }
        </div>
    )
}

export default Layout