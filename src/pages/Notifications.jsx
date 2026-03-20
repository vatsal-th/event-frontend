import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    LuBell, LuClock, LuCheck, LuX, LuChevronRight, LuLoader, LuInfo, LuArrowLeft, LuArrowRight, LuChevronDown,
    LuMic, LuStar, LuInstagram, LuCalendar, LuGift, LuMapPin, LuSearch, LuUser, LuEye, LuHash, LuCalendarDays,
    LuUserCheck, LuGlobe, LuCoins, LuMessageSquare, LuShieldCheck, LuWallet, LuBuilding, LuUsers
} from 'react-icons/lu';
import { getNotifications, markNotificationRead, viewNotifications } from '../api/notificationsApi';
import { getLatestStatus, markAsScratched, getUserHistory } from '../api/userHistoryApi';
import { getMyRechargeHistory } from '../api/rechargeApi';
import { fetchUnreadCount, resetUnreadCount } from '../store/slices/notificationSlice';
import ScratchCardModal from '../components/rewards/ScratchCardModal';
import { ModernModalLayout, ModernFormSection } from '../components/common/ModernModal';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
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
    const [activeTab, setActiveTab] = useState('service');
    const dropdownRef = useRef(null);
    const { serviceUnread, systemUnread } = useSelector(state => state.notifications);

    // Detail Modal State
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedDetailItem, setSelectedDetailItem] = useState(null);
    const [activeDetailTab, setActiveDetailTab] = useState('hosting');
    
    // Reward State
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [activeScratchData, setActiveScratchData] = useState(null);


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
        handleMarkAsViewed(activeTab);
        window.scrollTo(0, 0);
    }, [currentPage, limit, activeTab]);

    const handleMarkAsViewed = async (tab = activeTab) => {
        try {
            await viewNotifications({ type: tab });
            dispatch(resetUnreadCount(tab));
            // Also refresh global unread count to be sure
            dispatch(fetchUnreadCount());
        } catch (_) {}
    };

    const fetchNotifications = async (page = 1, fetchLimit = limit) => {
        try {
            setLoading(true);
            setError(null);
            // Fetch a large number of notifications to support client-side filtering across tabs
            const response = await getNotifications({ page, limit: 1000 });
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
        if (newPage >= 1 && newPage <= filteredTotalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCurrentPage(1);
    };

    const getStatusStyles = (status) => {
        const configs = {
            Pending: {
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                dot: 'bg-amber-400',
                icon: LuClock
            },
            Approved: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                dot: 'bg-emerald-400',
                icon: LuCheck
            },
            Rejected: {
                bg: 'bg-rose-50',
                text: 'text-rose-700',
                dot: 'bg-rose-400',
                icon: LuX
            }
        };
        return configs[status] || configs.Pending;
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const DetailItem = ({ icon: Icon, label, value, color = "text-gray-900" }) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    <Icon size={16} />
                </div>
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            <span className={`text-sm font-bold ${color} text-right max-w-[180px] break-words`}>{value || 'N/A'}</span>
        </div>
    );

    const handleNotificationClick = async (notification) => {
        // Mark as read if not already
        if (!notification.isRead) {
            try {
                await markNotificationRead(notification._id);
                dispatch(fetchUnreadCount());
            } catch (_) {}
        }

        // Do not navigate/open modal for System notices
        const category = (notification.category || '').toLowerCase();
        const type = (notification.type || '').toLowerCase();
        if (category === 'general' || ['general', 'personal', 'global'].includes(type) || activeTab === 'system') {
            return;
        }

        // Map notification type to tab type
        const cleanType = (notification.type || '').toLowerCase().replace(/\s/g, '');
        let tabType = '';
        if (cleanType.includes('hosting')) tabType = 'hosting';
        else if (cleanType.includes('event')) tabType = 'events';
        else if (cleanType.includes('influencer')) tabType = 'influencers';
        else if (cleanType.includes('agency')) tabType = 'agency';
        else if (cleanType.includes('topup')) tabType = 'topups';
        else if (cleanType.includes('recharge')) tabType = 'recharges';
        
        if (tabType) {
            try {
                setLoading(true);
                const historyRes = await getUserHistory();
                const rechargeRes = await getMyRechargeHistory();
                
                let foundItem = null;
                if (tabType === 'recharges') {
                    if (rechargeRes.success) {
                        foundItem = rechargeRes.data.find(item => item._id === notification.relatedId || item.id === notification.relatedId);
                        if (!foundItem && rechargeRes.data.length > 0) foundItem = rechargeRes.data[0];
                    }
                } else {
                    if (historyRes.success) {
                        const data = historyRes.data[tabType] || [];
                        foundItem = data.find(item => item._id === notification.relatedId || item.id === notification.relatedId);
                        if (!foundItem && data.length > 0) foundItem = data[0];
                    }
                }

                if (foundItem) {
                    setSelectedDetailItem(foundItem);
                    setActiveDetailTab(tabType);
                    setIsDetailOpen(true);
                } else {
                    navigate(`/history?tab=${tabType}`);
                }
            } catch (err) {
                console.error("Failed to fetch detail data:", err);
                navigate(`/history?tab=${tabType}`);
            } finally {
                setLoading(false);
            }
        } else if (cleanType.includes('salary')) {
            navigate('/salary');
        } else {
            navigate('/history');
        }
    };

    const handleClaimReward = (id, type, amount) => {
        setActiveScratchData({ id, type, amount });
        setIsRewardModalOpen(true);
        setIsDetailOpen(false);
    };

    const handleScratchComplete = async () => {
        if (!activeScratchData) return;
        try {
            await markAsScratched(activeScratchData.type, activeScratchData.id);
            setIsRewardModalOpen(false);
            setActiveScratchData(null);
            // Refresh detail item if needed, but usually once claimed it's fine
        } catch (error) {
            console.error('Error marking as scratched:', error);
            setIsRewardModalOpen(false);
        }
    };

    const renderDetailModalContent = () => {
        if (!selectedDetailItem) return null;
        const statusConfig = getStatusStyles(selectedDetailItem.status);

        return (
            <div className="space-y-6">
                {/* Status Section */}
                <div className="flex justify-center mb-2">
                    <div className={`flex items-center space-x-2 ${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-full`}>
                        <statusConfig.icon size={14} />
                        <span className="text-xs font-black uppercase tracking-wider">{selectedDetailItem.status}</span>
                    </div>
                </div>

                {/* Event Banner - Show only for Approved Events */}
                {activeDetailTab === 'events' && selectedDetailItem.status === 'Approved' && selectedDetailItem.eventBanner && (
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md mb-6">
                        <img 
                            src={selectedDetailItem.eventBanner} 
                            alt="Event Banner" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}

                {activeDetailTab !== 'topups' && (
                    <ModernFormSection title="Core Information">
                        <DetailItem icon={LuUser} label="Full Name" value={selectedDetailItem.fullName || selectedDetailItem.userId?.fullName} />
                        <DetailItem icon={LuHash} label="Mobile Number" value={selectedDetailItem.mobileNumber} />
                        <DetailItem icon={LuGlobe} label="Country" value={selectedDetailItem.countryId?.name || selectedDetailItem.countryId} />
                        <DetailItem icon={LuUserCheck} label="Gender" value={selectedDetailItem.gender} />
                    </ModernFormSection>
                )}

                <ModernFormSection title="Application Specifics">
                    {activeDetailTab === 'hosting' && (
                        <>
                            <DetailItem icon={LuMic} label="Category" value={selectedDetailItem.categoryId?.name || selectedDetailItem.categoryId} />
                            <DetailItem icon={LuStar} label="Talent" value={selectedDetailItem.talent} />
                        </>
                    )}
                    {activeDetailTab === 'events' && (
                        <>
                            <DetailItem icon={LuCoins} label="Budget" value={selectedDetailItem.budget} />
                            <DetailItem icon={LuCalendarDays} label="Event Date" value={selectedDetailItem.eventDate} />
                            <DetailItem icon={LuClock} label="Event Time" value={selectedDetailItem.eventTime} />
                            <DetailItem icon={LuHash} label="Agency Code" value={selectedDetailItem.agencyCode} />
                            <DetailItem icon={LuUser} label="Opponent ID" value={selectedDetailItem.opponentId} />
                        </>
                    )}
                    {activeDetailTab === 'influencers' && (
                        <>
                            <DetailItem icon={LuInstagram} label="Social Handle" value={`@${selectedDetailItem.socialMediaId}`} color="text-brand-purple" />
                            <DetailItem icon={LuStar} label="Followers" value={selectedDetailItem.instagramFollowers} />
                            <DetailItem icon={LuMic} label="Agency Code" value={selectedDetailItem.agencyCode} />
                        </>
                    )}
                    {activeDetailTab === 'agency' && (
                        <>
                            <DetailItem icon={LuBuilding} label="Agency Type" value={selectedDetailItem.agencyType} />
                            <DetailItem icon={LuUsers} label="Team Size" value={selectedDetailItem.teamSize} />
                            <DetailItem icon={LuGlobe} label="Region" value={selectedDetailItem.region} />
                        </>
                    )}
                    {activeDetailTab === 'topups' && (
                        <>
                            <DetailItem icon={LuUser} label="Target User" value={selectedDetailItem.targetUserName} />
                            <DetailItem icon={LuHash} label="Target ID" value={selectedDetailItem.targetUserId} />
                            <DetailItem icon={LuWallet} label="Wallet" value={selectedDetailItem.walletType} color="text-emerald-600" />
                            <DetailItem icon={LuCoins} label="Amount" value={`₹${selectedDetailItem.amount}`} color="text-brand-purple" />
                            <DetailItem icon={LuBuilding} label="App" value={selectedDetailItem.appId?.appName} />
                            <DetailItem icon={LuShieldCheck} label="Agent Code" value={selectedDetailItem.agentCode} />
                        </>
                    )}
                    {activeDetailTab === 'recharges' && (
                        <>
                            <DetailItem icon={LuUser} label="Agent Name" value={selectedDetailItem.agentName} />
                            <DetailItem icon={LuHash} label="Agent ID" value={selectedDetailItem.agentId} />
                            <DetailItem icon={LuWallet} label="Method" value={selectedDetailItem.rechargeType} color="text-brand-purple" />
                            <DetailItem icon={LuCoins} label="Amount" value={`₹${selectedDetailItem.amount}`} color="text-emerald-600" />
                            <DetailItem icon={LuShieldCheck} label="UTR Number" value={selectedDetailItem.utrNumber} color="text-blue-600" />
                        </>
                    )}
                </ModernFormSection>

                <ModernFormSection title="System Details">
                    <DetailItem icon={LuCalendar} label="Created At" value={formatDateTime(selectedDetailItem.createdAt)} />
                    <DetailItem icon={LuShieldCheck} label="Created By" value={selectedDetailItem.createdBy} />
                    <DetailItem icon={LuGift} label="Reward Coins" value={selectedDetailItem.rewardPoints ? `${selectedDetailItem.rewardPoints} Coins` : '0 Coins'} color="text-amber-600" />
                    <DetailItem icon={LuCheck} label="Rewards" value={selectedDetailItem.isScratched ? 'Claimed' : 'Pending'} color={selectedDetailItem.isScratched ? 'text-emerald-600' : 'text-amber-500'} />
                </ModernFormSection>

                {selectedDetailItem.rejectionReason && (
                    <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                        <div className="flex items-center space-x-2 text-rose-600 mb-2">
                            <LuInfo size={16} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Rejection Reason</span>
                        </div>
                        <p className="text-sm text-rose-800 font-bold leading-relaxed">{selectedDetailItem.rejectionReason}</p>
                    </div>
                )}
            </div>
        );
    };

    // Pagination helper for total count across all notifications
    const totalRecordsFromPagination = pagination?.totalRecords || notifications.length;

    // Filter notifications based on tab
    const filteredNotifications = notifications.filter(notification => {
        const category = (notification.category || '').toLowerCase();
        const type = (notification.type || '').toLowerCase();
        
        // System Notice Tab: category 'general' or fallback types
        const isSystem = category === 'general' || ['general', 'personal', 'global'].includes(type);
        
        return activeTab === 'system' ? isSystem : !isSystem;
    });

    // Update pagination count for filtered view
    // Note: This works best if the backend returns all records or if the current page has enough items.
    // If backend returns paginated data, filtering on client might show fewer items than 'limit'.
    const totalFilteredRecords = filteredNotifications.length;
    const filteredTotalPages = Math.ceil(totalFilteredRecords / limit) || 1;
    
    // Adjust current page if it's out of bounds after filtering/tab change
    useEffect(() => {
        if (currentPage > filteredTotalPages && filteredTotalPages > 0) {
            setCurrentPage(filteredTotalPages);
        }
    }, [filteredTotalPages, currentPage]);

    const itemsToDisplay = filteredNotifications.slice((currentPage - 1) * limit, currentPage * limit);

    const recordRangeStart = (currentPage - 1) * limit + 1;
    const recordRangeEnd = Math.min(currentPage * limit, totalFilteredRecords);

    // Override visible pages for filtered view
    const getFilteredVisiblePages = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (filteredTotalPages <= maxPagesToShow) {
            for (let i = 1; i <= filteredTotalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(filteredTotalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            
            if (currentPage < filteredTotalPages - 2) pages.push('...');
            if (!pages.includes(filteredTotalPages)) pages.push(filteredTotalPages);
        }
        return pages;
    };

    const filteredVisiblePages = getFilteredVisiblePages();

    const renderPagination = () => {
        if (filteredNotifications.length === 0) return null;

        return (
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
                            {recordRangeStart}-{recordRangeEnd} of {totalFilteredRecords}
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
                                {filteredVisiblePages.map((p, i) => (
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
                                disabled={currentPage === filteredTotalPages}
                                className={`p-2.5 rounded-xl transition-all border ${currentPage === filteredTotalPages 
                                    ? 'bg-gray-50 text-gray-300 border-gray-100' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-brand-purple cursor-pointer shadow-sm active:scale-90'}`}
                            >
                                <LuArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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

            {/* Tabs */}
            <div className="flex space-x-8 mb-8 border-b border-gray-100">
                {[
                    { id: 'service', label: 'Service Notice', count: serviceUnread },
                    { id: 'system', label: 'System Notice', count: systemUnread }
                ].map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`relative py-4 flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                                isActive ? 'text-brand-purple' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                            {tab.count > 0 && (
                                <span className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold border-2 border-white shadow-sm transition-all duration-300 ${
                                    isActive ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {tab.count > 99 ? '99+' : tab.count}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple rounded-t-full shadow-[0_-4px_10px_rgba(109,40,217,0.3)]"></div>
                            )}
                        </button>
                    );
                })}
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

            {!loading && !error && (
                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        <>
                            {itemsToDisplay.map((notification) => {
                                const { icon, bg, labelClass } = getNotificationStyle(notification.type, notification.status);
                                const nId = notification.id || notification._id;
                                
                                const category = (notification.category || '').toLowerCase();
                                const type = (notification.type || '').toLowerCase();
                                const isSystemNotice = category === 'general' || ['general', 'personal', 'global'].includes(type);

                                return (
                                    <div
                                        key={nId}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`bg-white rounded-2xl p-4 border transition-all duration-300 group flex items-start space-x-3.5 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 ${
                                            !isSystemNotice 
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
                                                isSystemNotice ? 'mb-0' : 'mb-2.5'
                                            }`}>
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                {notification.status && (
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${labelClass}`}>
                                                        {notification.status}
                                                    </span>
                                                )}
                                                {notification.type && !isSystemNotice && (
                                                    <span className="text-[12px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                                        {notification.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {!isSystemNotice && (
                                            <div className="hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-brand-purple text-gray-400">
                                                    <LuChevronRight size={16} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            
                            {renderPagination()}
                        </>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-16 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
                                <LuBell size={36} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">No {activeTab === 'service' ? 'Service' : 'System'} Notices Yet</h3>
                            <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
                                {activeTab === 'service' 
                                    ? "When you apply for categories, their status updates will appear here."
                                    : "Important announcements and system updates will appear here."} Check back later!
                            </p>
                        </div>
                    )}
                </div>
            )}

            <ModernModalLayout
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                title="Application Details"
                id={selectedDetailItem?.transactionId || selectedDetailItem?._id?.substring(0, 8).toUpperCase()}
                HeaderIcon={LuInfo}
            >
                {renderDetailModalContent()}
            </ModernModalLayout>

            <ScratchCardModal
                isOpen={isRewardModalOpen}
                onClose={() => setIsRewardModalOpen(false)}
                rewardAmount={activeScratchData?.amount}
                onComplete={handleScratchComplete}
            />
        </div>
    );
};

export default Notifications;
