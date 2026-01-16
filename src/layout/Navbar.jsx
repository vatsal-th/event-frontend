import React, { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import Button from '../components/common/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Training', href: '/training' },
        { name: 'Feedback & Issues', href: '/feedback' },
        { name: 'Employee Login', href: '/employee-login' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                            <span className="text-xl font-bold italic text-white">R</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
                                RAJPUT
                                <span className="block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">Entertainment Hub</span>
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-gray-600 hover:text-brand-purple transition-colors cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-3">
                            <Button variant="secondary" size="sm" className="rounded-full px-6" onClick={() => window.location.href = '/about'}>
                                About us
                            </Button>
                            <Button variant="primary" size="sm" className="rounded-full px-6" onClick={() => window.location.href = '/login'}>
                                Login / Register
                            </Button>
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
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-semibold text-gray-600 hover:text-brand-purple"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/login'}>
                            Login
                        </Button>
                        <Button variant="primary" className="w-full" onClick={() => window.location.href = '/register'}>
                            Register
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
