import React, { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Training', href: '/training' },
        { name: 'Feedback & Issues', href: '/feedback' },
        { name: 'Employee Login', href: '/employee-login' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                            <span className="text-xl font-bold italic text-white">R</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
                                RAJPUT
                                <span className="block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">Entertainment Hub</span>
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-bold transition-all duration-300 relative py-1
                                    ${isActive(link.href)
                                        ? 'text-brand-purple border-b-2 border-brand-purple'
                                        : 'text-gray-600 hover:text-brand-purple hover:bg-gray-50/50 rounded-lg px-2'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-3">
                            <Link to="/about">
                                <Button variant="secondary" size="sm" className="rounded-full px-6">
                                    About us
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="primary" size="sm" className="rounded-full px-6">
                                    Login / Register
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-base font-semibold transition-colors
                                ${isActive(link.href) ? 'text-brand-purple bg-purple-50 p-2 rounded-lg' : 'text-gray-600 hover:text-brand-purple'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="secondary" className="w-full">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                            <Button variant="primary" className="w-full">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
