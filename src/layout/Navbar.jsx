import React, { useState, useRef, useEffect } from 'react';
import { LuMenu, LuX, LuUser, LuWallet, LuLogOut, LuChevronDown, LuBriefcase, LuHistory, LuGift } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletSummary } from '../store/slices/walletSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const dispatch = useDispatch();
    const { balance, summary } = useSelector((state) => state.wallet);

    // Use summary balance if available, otherwise fall back to static balance
    const walletBalance = summary?.currentBalance ?? balance;

    // Fetch wallet summary when user is logged in
    useEffect(() => {
        if (user) {
            dispatch(fetchWalletSummary());
        }
    }, [user, dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fullNavLinks = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Services', href: '/services' },
        { name: 'Training', href: '/training' },
        { name: 'Feedback & Issues', href: '/feedback' },
    ];

    // Filter links: Guests see Home/Services/Etc. Logged in users see Dashboard etc.
    const guestNavLinks = [
        { name: 'Home', href: '/' },
        { name: 'Training', href: '/training' },
        { name: 'Feedback & Issues', href: '/feedback' },
        { name: 'Employee Login', href: '/employee-login' },
    ];

    const navLinks = isAuthenticated ? fullNavLinks : guestNavLinks;

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-3 cursor-pointer group">
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
                    <div className="hidden lg:flex items-center space-x-8">
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

                        <div className="flex items-center space-x-3 ml-4">
                            {!isAuthenticated ? (
                                <>
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
                                </>
                            ) : (
                                // Profile Dropdown
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 p-1 pr-3 rounded-full border border-gray-100 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
                                    >
                                        <div className="w-9 h-9 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                            {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">{user?.fullName || user?.name || 'User'}</span>
                                        <LuChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md cursor-pointer">
                                                    {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{user?.fullName || user?.name || 'User Name'}</p>
                                                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                                                </div>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                <Link to="/profile" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                    <LuUser size={18} />
                                                    <span className="font-medium text-sm">My Profile</span>
                                                </Link>
                                                <Link to="/wallet" className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                    <div className="flex items-center space-x-3">
                                                        <LuWallet size={18} />
                                                        <span className="font-medium text-sm">My Wallet</span>
                                                    </div>
                                                    <span className="px-2 py-0.5 bg-brand-purple/10 text-brand-purple text-xs font-bold rounded-full">₹{walletBalance}</span>
                                                </Link>
                                                <Link to="/invite" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                    <LuGift size={18} />
                                                    <span className="font-medium text-sm">Invite & Earn</span>
                                                </Link>
                                                <Link to="/history" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-brand-purple transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                    <LuHistory size={18} />
                                                    <span className="font-medium text-sm">My History</span>
                                                </Link>
                                            </div>

                                            <div className="p-2 border-t border-gray-100">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                                                >
                                                    <LuLogOut size={18} />
                                                    <span className="font-medium text-sm">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 p-2 rounded-lg"
                    >
                        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="lg:hidden bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 shadow-xl absolute w-full left-0 top-20 animate-in slide-in-from-top-2 h-[calc(100vh-5rem)] overflow-y-auto">
                    {isAuthenticated && (
                        <div className="bg-purple-50 p-4 rounded-2xl flex items-center space-x-4 mb-2">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-purple text-xl font-bold shadow-sm">
                                {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 leading-tight">Welcome, {user?.fullName || user?.name}</p>
                                <div className="flex items-center space-x-1 mt-1 text-sm text-brand-purple font-medium">
                                    <LuWallet size={14} />
                                    <span>Balance: ₹732</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-base font-semibold transition-colors block
                                    ${isActive(link.href) ? 'text-brand-purple bg-purple-50 p-3 rounded-xl' : 'text-gray-600 hover:text-brand-purple p-3 hover:bg-gray-50 rounded-xl'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {!isAuthenticated ? (
                        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                            <Link to="/about" onClick={() => setIsOpen(false)}>
                                <Button variant="secondary" size="sm" className="w-full rounded-xl py-3">
                                    About us
                                </Button>
                            </Link>
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="primary" className="w-full rounded-xl py-3">
                                    Login / Register
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-1 pt-4 border-t border-gray-100">
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                <LuUser size={20} />
                                <span className="font-semibold">My Profile</span>
                            </Link>
                            <Link to="/wallet" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                <LuWallet size={20} />
                                <span className="font-semibold">My Wallet</span>
                            </Link>
                            <Link to="/invite" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                <LuGift size={20} />
                                <span className="font-semibold">Invite & Earn</span>
                            </Link>
                            <Link to="/history" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                <LuHistory size={20} />
                                <span className="font-semibold">My History</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 mt-2 cursor-pointer"
                            >
                                <LuLogOut size={20} />
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
