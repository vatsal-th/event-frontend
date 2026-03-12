import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuBell, LuClock, LuCheck, LuX, LuChevronRight, LuLoader, LuInfo, LuArrowLeft, LuArrowRight, LuChevronDown } from 'react-icons/lu';
import { getNotifications, markNotificationRead, viewNotifications } from '../api/notificationsApi';
import { resetUnreadCount } from '../store/slices/notificationSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatShortTime = (date) => {
    const time = dayjs(date).fromNow();
    return time
        .replace('an hour ago', '1 hour ago')
        .replace('a minute ago', '1 min ago')
        .replace('minutes ago', 'min ago')
        .replace('hours ago', 'hr ago')
        .replace('a day ago', '1 day ago')
        .replace('days ago', 'days ago')
        .replace('a few seconds ago', 'few sec ago');
};

const getNotificationStyle = (type, status) => {
    if (status) {
        const s = status.toLowerCase();
        if (s === 'approved') return {
            icon: <LuCheck className="text-green-500" size={20} />,
            bg: 'bg-green-50',
            labelClass: 'bg-green-100 text-green-700'
        };
        if (s === 'rejected') return {
            icon: <LuX className="text-red-500" size={20} />,
            bg: 'bg-red-50',
            labelClass: 'bg-red-100 text-red-700'
        };
        return {
            icon: <LuClock className="text-yellow-500" size={20} />,
            bg: 'bg-yellow-50',
            labelClass: 'bg-yellow-100 text-yellow-700'
        };
    }
    return {
        icon: <LuInfo className="text-blue-500" size={20} />,
        bg: 'bg-blue-50',
        labelClass: 'bg-blue-100 text-blue-700'
    };
};

const LIMIT = 10;

const Notifications = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState(null);
    const [isLimitDropdownOpen, setIsLimitDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLimitDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        fetchNotifications(currentPage, limit);
        handleMarkAsViewed();
        window.scrollTo(0, 0);
    }, [currentPage, limit]);

    const handleMarkAsViewed = async () => {
        try {
            await viewNotifications();
            dispatch(resetUnreadCount());
        } catch (_) {}
    };

    const fetchNotifications = async (page = 1, fetchLimit = limit) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getNotifications({ page, limit: fetchLimit });
            if (response.success) {
                setNotifications(response.data || []);
                setPagination(response.pagination || null);
            } else {
                setError(response.message || 'Failed to load notifications');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= effectiveTotalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleNotificationClick = async (notification) => {
        // Mark as read if not already
        if (!notification.isRead) {
            try {
                await markNotificationRead(notification._id);
            } catch (_) {}
        }

        // Do not navigate for General or Personal notifications
        if (['General', 'Personal'].includes(notification.type)) {
            return;
        }

        // Redirect based on type
        const typeMapping = {
            'Hosting': 'hosting',
            'Event Hosting': 'hosting',
            'Event': 'events',
            'Apply Event': 'events',
            'Influencer': 'influencers',
            'Agency': 'agency',
            'Topup': 'topups',
            'Recharge': 'recharges'
        };

        const tabId = typeMapping[notification.type] || 'hosting';
        navigate(`/history?tab=${tabId}`);
    };

    // Pagination helpers
    const totalRecords = pagination?.totalRecords || notifications.length;
    const derivedTotalPages = Math.ceil(totalRecords / limit);
    const effectiveTotalPages = Math.max(derivedTotalPages, 1);
    
    // Determine if we need to slice the notifications (if backend returned all of them)
    const isClientSidePaginating = notifications.length > limit && notifications.length === totalRecords;
    const itemsToDisplay = isClientSidePaginating 
        ? notifications.slice((currentPage - 1) * limit, currentPage * limit)
        : notifications;

    const recordRangeStart = (currentPage - 1) * limit + 1;
    const recordRangeEnd = Math.min(currentPage * limit, totalRecords);

    const getVisiblePages = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (effectiveTotalPages <= maxPagesToShow) {
            for (let i = 1; i <= effectiveTotalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(effectiveTotalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            
            if (currentPage < effectiveTotalPages - 2) pages.push('...');
            if (!pages.includes(effectiveTotalPages)) pages.push(effectiveTotalPages);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                {/* <div className="w-12 h-12 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center text-brand-purple shadow-inner relative">
                    <LuBell size={24} />
                    {notifications.some(n => !n.isRead) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                    )}
                </div> */}
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Track your application statuses and incoming updates</p>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <LuLoader className="animate-spin text-brand-purple" size={32} />
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                    <p className="text-red-600 font-bold text-sm">{error}</p>
                    <button
                        onClick={() => fetchNotifications()}
                        className="mt-3 text-xs font-black text-red-500 underline underline-offset-2 cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Notifications List */}
            {!loading && !error && (
                <div className="space-y-3">
                    {notifications.length > 0 ? (
                        <>
                            {itemsToDisplay.map((notification) => {
                                const { icon, bg, labelClass } = getNotificationStyle(notification.type, notification.status);
                                const nId = notification.id || notification._id;
                                return (
                                    <div
                                        key={nId}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`bg-white rounded-2xl p-4 border transition-all duration-300 group flex items-start space-x-3.5 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 ${
                                            !['General', 'Personal'].includes(notification.type) 
                                                ? 'cursor-pointer' 
                                                : 'cursor-default'
                                        } ${
                                            !notification.isRead
                                                ? 'border-brand-purple/30 shadow-md shadow-purple-50'
                                                : 'border-gray-100/80 shadow-sm'
                                        }`}
                                    >
                                        {/* Icon */}
                                        <div className="relative flex-shrink-0 mt-0.5">
                                            <div className={`p-2.5 rounded-2xl ${bg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                                {icon}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1 gap-2">
                                                <h3 className={`font-bold text-sm sm:text-base truncate ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                                                    {formatShortTime(notification.createdAt)}
                                                </span>
                                            </div>

                                            <p className={`text-gray-500 text-xs sm:text-sm leading-relaxed ${
                                                ['General', 'Personal'].includes(notification.type) ? 'mb-0' : 'mb-2.5'
                                            }`}>
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                {notification.status && (
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${labelClass}`}>
                                                        {notification.status}
                                                    </span>
                                                )}
                                                {notification.type && !['General', 'Personal'].includes(notification.type) && (
                                                    <span className="text-[12px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                                        {notification.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {!['General', 'Personal'].includes(notification.type) && (
                                            <div className="hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-brand-purple text-gray-400">
                                                    <LuChevronRight size={16} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            
                            {/* Pagination Bar */}
                            {notifications.length > 0 && (
                                <div className="pt-8 pb-4">
                                    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                                        {/* Left: Entries Selector */}
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Show</span>
                                            <div className="relative" ref={dropdownRef}>
                                                <button
                                                    onClick={() => setIsLimitDropdownOpen(!isLimitDropdownOpen)}
                                                    className="flex items-center justify-between w-18 bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl px-3 py-1.5 cursor-pointer transition-all hover:bg-gray-50 focus:outline-none shadow-sm"
                                                >
                                                    <span>{limit}</span>
                                                    <LuChevronDown size={14} className={`ml-1 transition-transform duration-200 ${isLimitDropdownOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                
                                                {isLimitDropdownOpen && (
                                                    <div className="absolute top-full left-0 mt-2 w-18 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {[5, 10, 20, 50].map((val) => (
                                                            <button
                                                                key={val}
                                                                onClick={() => {
                                                                    handleLimitChange(val);
                                                                    setIsLimitDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-3 py-2 text-sm font-bold text-left transition-colors ${
                                                                    limit === val 
                                                                        ? 'bg-blue-600 text-white' 
                                                                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                                }`}
                                                            >
                                                                {val}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">per page</span>
                                        </div>

                                        {/* Right: Record Info and Buttons */}
                                        <div className="flex items-center space-x-6">
                                            <span className="text-sm text-gray-500 font-bold hidden md:inline-block">
                                                {recordRangeStart}-{recordRangeEnd} of {totalRecords}
                                            </span>
                                            
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`p-2.5 rounded-xl transition-all border ${currentPage === 1 
                                                        ? 'bg-gray-50 text-gray-300 border-gray-100' 
                                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-brand-purple cursor-pointer shadow-sm active:scale-90'}`}
                                                >
                                                    <LuArrowLeft size={18} />
                                                </button>

                                                <div className="flex items-center space-x-1">
                                                    {visiblePages.map((p, i) => (
                                                        p === '...' ? (
                                                            <span key={`dots-${i}`} className="px-2 text-gray-400 font-bold">...</span>
                                                        ) : (
                                                            <button
                                                                key={p}
                                                                onClick={() => handlePageChange(p)}
                                                                className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${currentPage === p 
                                                                    ? 'bg-brand-purple text-white shadow-lg shadow-purple-100' 
                                                                    : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple cursor-pointer'}`}
                                                            >
                                                                {p}
                                                            </button>
                                                        )
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === effectiveTotalPages}
                                                    className={`p-2.5 rounded-xl transition-all border ${currentPage === effectiveTotalPages 
                                                        ? 'bg-gray-50 text-gray-300 border-gray-100' 
                                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-brand-purple cursor-pointer shadow-sm active:scale-90'}`}
                                                >
                                                    <LuArrowRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-16 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
                                <LuBell size={36} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">No Notifications Yet</h3>
                            <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                                When you apply for categories, their status updates will appear here. Check back later!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
