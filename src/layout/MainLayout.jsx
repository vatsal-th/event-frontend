import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    const location = useLocation();

    // Define pages where Navbar and Footer should be hidden
    const hideHeaderFooter =
        ['/login', '/register', '/employee-login', '/forgotpassword'].includes(location.pathname) ||
        location.pathname.startsWith('/resetpassword');

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
            {!hideHeaderFooter && <Navbar />}

            <main className={`flex-grow ${!hideHeaderFooter ? 'pt-20' : ''}`}>
                {children}
            </main>

            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
