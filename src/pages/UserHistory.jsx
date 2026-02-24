import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    LuMic,
    LuStar,
    LuInstagram,
    LuCalendar,
    LuClock,
    LuCheck,
    LuX,
    LuLoader,
    LuInfo,
    LuGift,
    LuMapPin,
    LuSearch,
    LuChevronRight,
    LuArrowLeft,
    LuUser,
    LuEye,
    LuHash,
    LuCalendarDays,
    LuUserCheck,
    LuGlobe,
    LuCoins,
    LuMessageSquare,
    LuShieldCheck,
    LuWallet,
    LuBuilding,
    LuUsers
} from 'react-icons/lu';
import { getUserHistory, markAsScratched } from '../api/userHistoryApi';
import { getMyRechargeHistory } from '../api/rechargeApi';
import { Select } from '../components/common/Forms';
import ScratchCardModal from '../components/rewards/ScratchCardModal';
import RechargeStatusModal from '../components/status/RechargeStatusModal';
import { ModernModalLayout, ModernFormSection } from '../components/common/ModernModal';

const UserHistory = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab') || 'hosting';
    const [activeTab, setActiveTab] = useState(tabFromUrl);
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Rewards State
    const [isScratchOpen, setIsScratchOpen] = useState(false);
    const [currentReward, setCurrentReward] = useState(0);
    const [scratchingAppId, setScratchingAppId] = useState(null);

    // Detail Modal State
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isRechargeDetailOpen, setIsRechargeDetailOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError(null);
            const [historyRes, rechargeRes] = await Promise.all([
                getUserHistory(),
                getMyRechargeHistory()
            ]);

            if (historyRes.success) {
                const combinedData = { ...historyRes.data };
                if (rechargeRes.success) {
                    combinedData.recharges = rechargeRes.data;
                }
                setHistoryData(combinedData);
            } else {
                setError(historyRes.message || 'Failed to load history');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching history');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'hosting', label: 'Hosting', icon: LuMic, color: 'purple' },
        { id: 'events', label: 'Events', icon: LuStar, color: 'blue' },
        { id: 'influencers', label: 'Influencers', icon: LuInstagram, color: 'pink' },
        { id: 'agency', label: 'Agency', icon: LuBuilding, color: 'amber' },
        { id: 'topups', label: 'Top-Up', icon: LuCoins, color: 'emerald' },
        { id: 'recharges', label: 'Recharge', icon: LuWallet, color: 'brand-purple' }
    ];

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

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
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

    const handleScratchOpen = (item) => {
        setScratchingAppId(item._id);
        setCurrentReward(item.rewardPoints);
        setIsScratchOpen(true);
    };

    const handleScratchComplete = async () => {
        try {
            // Map the tab IDs to the singular types expected by the backend
            const typeMapping = {
                hosting: 'hosting',
                events: 'event',
                influencers: 'influencer',
                agency: 'agency'
            };
            
            const apiType = typeMapping[activeTab] || activeTab;
            if (apiType === 'topups') return; // Double check for topups
            
            await markAsScratched(apiType, scratchingAppId);
            setIsScratchOpen(false);
            fetchHistory(); // Refresh data to hide the scratch button
        } catch (err) {
            console.error("Failed to mark as scratched:", err);
            setIsScratchOpen(false);
        }
    };

    const handleViewDetail = (item) => {
        setSelectedItem(item);
        if (activeTab === 'recharges') {
            setIsRechargeDetailOpen(true);
        } else {
            setIsDetailOpen(true);
        }
    };

    // Filtered Data
    const filteredData = useMemo(() => {
        const currentData = historyData?.[activeTab] || [];
        return currentData.filter(item => {
            const name = (item.fullName || item.targetUserName || item.agentName || item.userId?.fullName || '').toLowerCase();
            const sid = (item.targetUserId || item.socialMediaId || item.utrNumber || '').toLowerCase();
            const query = searchQuery.toLowerCase();
            
            const matchesSearch = name.includes(query) || 
                                 sid.includes(query) ||
                                 (item.mobileNumber || item.agentId || '').includes(searchQuery);
                                 
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [historyData, activeTab, searchQuery, statusFilter]);

    const renderEmptyState = () => {
        const TabIcon = tabs.find(t => t.id === activeTab)?.icon || LuInfo;
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                    <TabIcon size={40} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No Applications Found</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8 font-medium">
                    {searchQuery || statusFilter !== 'all' 
                        ? "No results match your filters. Try adjusting them." 
                        : `You haven't submitted any ${activeTab} applications yet.`}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                    <button 
                        onClick={() => navigate(`/${activeTab}`)}
                        className="px-8 py-3 bg-brand-purple text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                        Apply Now
                    </button>
                )}
            </div>
        );
    };

    const renderActionButtons = (item) => (
        <div className="flex items-center justify-end space-x-2">
            {item.status === 'Approved' && item.rewardPoints > 0 && !item.isScratched && activeTab !== 'topups' && activeTab !== 'recharges' && (
                <button 
                    onClick={() => handleScratchOpen(item)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-amber-200 transition-all active:scale-95 group cursor-pointer"
                >
                    <LuGift size={14} className="group-hover:rotate-12 transition-transform" />
                    <span>Scratch Card</span>
                </button>
            )}
            <button 
                onClick={() => handleViewDetail(item)}
                className="p-2 text-gray-400 hover:text-brand-purple hover:bg-purple-50 rounded-xl transition-all cursor-pointer"
                title="View Details"
            >
                <LuEye size={20} />
            </button>
        </div>
    );

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

    const renderDetailModalContent = () => {
        if (!selectedItem) return null;
        const statusConfig = getStatusStyles(selectedItem.status);

        return (
            <div className="space-y-6">
                {/* Status Section */}
                <div className="flex justify-center mb-2">
                    <div className={`flex items-center space-x-2 ${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-full`}>
                        <statusConfig.icon size={14} />
                        <span className="text-xs font-black uppercase tracking-wider">{selectedItem.status}</span>
                    </div>
                </div>

                {/* Event Banner - Show only for Approved Events */}
                {activeTab === 'events' && selectedItem.status === 'Approved' && selectedItem.eventBanner && (
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md mb-6">
                        <img 
                            src={selectedItem.eventBanner} 
                            alt="Event Banner" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}

                {activeTab !== 'topups' && (
                    <ModernFormSection title="Core Information">
                        <DetailItem icon={LuUser} label="Full Name" value={selectedItem.fullName || selectedItem.userId?.fullName} />
                        <DetailItem icon={LuHash} label="Mobile Number" value={selectedItem.mobileNumber} />
                        <DetailItem icon={LuGlobe} label="Country" value={selectedItem.countryId?.name || selectedItem.countryId} />
                        <DetailItem icon={LuUserCheck} label="Gender" value={selectedItem.gender} />
                    </ModernFormSection>
                )}

                <ModernFormSection title="Application Specifics">
                    {activeTab === 'hosting' && (
                        <>
                            <DetailItem icon={LuMic} label="Category" value={selectedItem.categoryId?.name || selectedItem.categoryId} />
                            <DetailItem icon={LuStar} label="Talent" value={selectedItem.talent} />
                        </>
                    )}
                    {activeTab === 'events' && (
                        <>
                            <DetailItem icon={LuCoins} label="Budget" value={selectedItem.budget} />
                            <DetailItem icon={LuCalendarDays} label="Event Date" value={selectedItem.eventDate} />
                            <DetailItem icon={LuClock} label="Event Time" value={selectedItem.eventTime} />
                            <DetailItem icon={LuHash} label="Agency Code" value={selectedItem.agencyCode} />
                            <DetailItem icon={LuUser} label="Opponent ID" value={selectedItem.opponentId} />
                        </>
                    )}
                    {activeTab === 'influencers' && (
                        <>
                            <DetailItem icon={LuInstagram} label="Social Handle" value={`@${selectedItem.socialMediaId}`} color="text-brand-purple" />
                            <DetailItem icon={LuStar} label="Followers" value={selectedItem.instagramFollowers} />
                            <DetailItem icon={LuMic} label="Agency Code" value={selectedItem.agencyCode} />
                        </>
                    )}
                    {activeTab === 'agency' && (
                        <>
                            <DetailItem icon={LuBuilding} label="Agency Type" value={selectedItem.agencyType} />
                            <DetailItem icon={LuUsers} label="Team Size" value={selectedItem.teamSize} />
                            <DetailItem icon={LuGlobe} label="Region" value={selectedItem.region} />
                        </>
                    )}
                    {activeTab === 'topups' && (
                        <>
                            <DetailItem icon={LuUser} label="Target User" value={selectedItem.targetUserName} />
                            <DetailItem icon={LuHash} label="Target ID" value={selectedItem.targetUserId} />
                            <DetailItem icon={LuWallet} label="Wallet" value={selectedItem.walletType} color="text-emerald-600" />
                            <DetailItem icon={LuCoins} label="Amount" value={`₹${selectedItem.amount}`} color="text-brand-purple" />
                            <DetailItem icon={LuBuilding} label="App" value={selectedItem.appId?.appName} />
                            <DetailItem icon={LuShieldCheck} label="Agent Code" value={selectedItem.agentCode} />
                        </>
                    )}
                    {activeTab === 'recharges' && (
                        <>
                            <DetailItem icon={LuUser} label="Agent Name" value={selectedItem.agentName} />
                            <DetailItem icon={LuHash} label="Agent ID" value={selectedItem.agentId} />
                            <DetailItem icon={LuWallet} label="Method" value={selectedItem.rechargeType} color="text-brand-purple" />
                            <DetailItem icon={LuCoins} label="Amount" value={`₹${selectedItem.amount}`} color="text-emerald-600" />
                            <DetailItem icon={LuShieldCheck} label="UTR Number" value={selectedItem.utrNumber} color="text-blue-600" />
                        </>
                    )}
                </ModernFormSection>

                <ModernFormSection title="System Details">
                    <DetailItem icon={LuCalendar} label="Created At" value={formatDateTime(selectedItem.createdAt)} />
                    <DetailItem icon={LuShieldCheck} label="Created By" value={selectedItem.createdBy} />
                    <DetailItem icon={LuGift} label="Reward Coins" value={selectedItem.rewardPoints ? `${selectedItem.rewardPoints} Coins` : '0 Coins'} color="text-amber-600" />
                    <DetailItem icon={LuCheck} label="Rewards" value={selectedItem.isScratched ? 'Claimed' : 'Pending'} color={selectedItem.isScratched ? 'text-emerald-600' : 'text-amber-500'} />
                </ModernFormSection>

                {selectedItem.rejectionReason && (
                    <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                        <div className="flex items-center space-x-2 text-rose-600 mb-2">
                            <LuInfo size={16} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Rejection Reason</span>
                        </div>
                        <p className="text-sm text-rose-800 font-bold leading-relaxed">{selectedItem.rejectionReason}</p>
                    </div>
                )}
            </div>
        );
    };


    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-100 border-t-brand-purple rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <LuLoader size={20} className="text-brand-purple" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-500 font-black uppercase tracking-widest text-xs animate-pulse">Loading Records...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-500">
                        <LuInfo size={32} />
                    </div>
                    <p className="text-gray-900 font-black text-lg mb-2">History Sync Error</p>
                    <p className="text-gray-500 text-sm mb-8 font-medium max-w-xs">{error}</p>
                    <button
                        onClick={fetchHistory}
                        className="px-8 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-100 active:scale-95 transition-all cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        if (filteredData.length === 0) return renderEmptyState();

        return (
            <div className="overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/30">
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Specifics</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.map((item) => {
                                const status = getStatusStyles(item.status);
                                return (
                                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-brand-purple font-black text-xs uppercase">
                                                    {(item.fullName || item.userId?.fullName || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 line-clamp-1">{item.fullName || item.userId?.fullName || 'Anonymous'}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.mobileNumber || 'No record'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                {activeTab === 'hosting' && (
                                                    <>
                                                        <p className="text-xs font-bold text-gray-700">{item.categoryId?.name || 'Hosting'}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{item.talent}</p>
                                                    </>
                                                )}
                                                {activeTab === 'events' && (
                                                    <>
                                                        <p className="text-xs font-bold text-gray-700">{item.budget}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{item.eventDate}</p>
                                                    </>
                                                )}
                                                {activeTab === 'influencers' && (
                                                    <>
                                                        <p className="text-xs font-bold text-gray-700">{item.instagramFollowers} Followers</p>
                                                        <p className="text-[10px] text-gray-400 font-medium text-brand-purple">@{item.socialMediaId}</p>
                                                    </>
                                                )}
                                                {activeTab === 'agency' && (
                                                    <>
                                                        <p className="text-xs font-bold text-gray-700">{item.agencyType || 'Agency'}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{item.region}</p>
                                                    </>
                                                )}
                                                {activeTab === 'topups' && (
                                                    <>
                                                        <p className="text-xs font-bold text-emerald-600">₹{item.amount} {item.walletType}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{item.appId?.appName}</p>
                                                    </>
                                                )}
                                                {activeTab === 'recharges' && (
                                                    <>
                                                        <p className="text-xs font-bold text-brand-purple">₹{item.amount?.toLocaleString()} ({item.rechargeType})</p>
                                                        <p className="text-[10px] text-gray-400 font-medium truncate">UTR: {item.utrNumber}</p>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center text-xs font-bold text-gray-500 whitespace-nowrap">
                                                <LuCalendar className="mr-2" size={14} />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                                                <status.icon className="mr-1.5" size={12} />
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            {renderActionButtons(item)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 px-4 py-6 bg-gray-50/30">
                    {filteredData.map((item) => {
                        const status = getStatusStyles(item.status);
                        return (
                            <div key={item._id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm active:scale-[0.98] transition-all">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-brand-purple">
                                            <LuUser size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-gray-900 leading-tight line-clamp-1">{item.fullName || item.userId?.fullName}</h4>
                                            <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase mt-1">
                                                <LuCalendar size={12} className="mr-1.5" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                                        {item.status}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pb-5 border-b border-gray-50">
                                    {activeTab === 'hosting' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Category</p>
                                                <p className="text-xs font-bold text-gray-900">{item.categoryId?.name || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Talent</p>
                                                <p className="text-xs font-bold text-gray-900 truncate">{item.talent || '-'}</p>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'events' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Budget</p>
                                                <p className="text-xs font-bold text-gray-900 truncate">{item.budget}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Event Date</p>
                                                <p className="text-xs font-bold text-gray-900">{item.eventDate}</p>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'influencers' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Followers</p>
                                                <p className="text-xs font-bold text-gray-900">{item.instagramFollowers}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Handle</p>
                                                <p className="text-xs font-bold text-brand-purple">@{item.socialMediaId}</p>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'agency' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Type</p>
                                                <p className="text-xs font-bold text-gray-900">{item.agencyType}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Region</p>
                                                <p className="text-xs font-bold text-gray-900">{item.region}</p>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'topups' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Amount</p>
                                                <p className="text-xs font-bold text-emerald-600">₹{item.amount}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Target</p>
                                                <p className="text-xs font-bold text-gray-900">{item.targetUserId}</p>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'recharges' && (
                                        <>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">Amount</p>
                                                <p className="text-xs font-bold text-brand-purple">₹{item.amount}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-wider">UTR No</p>
                                                <p className="text-xs font-bold text-gray-900 truncate">{item.utrNumber}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    {item.status === 'Approved' && item.rewardPoints > 0 && !item.isScratched && activeTab !== 'recharges' ? (
                                        <button 
                                            onClick={() => handleScratchOpen(item)}
                                            className="flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-amber-200 transition-all active:scale-95 cursor-pointer"
                                        >
                                            <LuGift size={16} />
                                            <span>Lucky Scratch</span>
                                        </button>
                                    ) : <div></div>}
                                    <button 
                                        onClick={() => handleViewDetail(item)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-brand-purple rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-purple-100 transition-all active:scale-95 cursor-pointer"
                                    >
                                        <LuEye size={16} />
                                        <span>View Details</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer"
                        >
                            <LuArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Application History</h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Track your submissions & status</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Bar */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto scroller-hide">
                    <div className="flex space-x-8">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const count = historyData?.[tab.id]?.length || 0;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setSearchQuery('');
                                    }}
                                    className={`relative py-4 flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                                        isActive ? 'text-brand-purple' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                                    {count > 0 && (
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                                            isActive ? 'bg-purple-100 text-brand-purple' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {count}
                                        </span>
                                    )}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple rounded-t-full shadow-[0_-4px_10px_rgba(109,40,217,0.3)]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                {/* Search & Filters */}
                <div className="mb-6 flex flex-col md:flex-row items-end gap-4">
                    <div className="relative flex-1 group w-full">
                        <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name or number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all placeholder:text-gray-300 shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-56">
                        <Select 
                            value={statusFilter}
                            onChange={(val) => setStatusFilter(val)}
                            options={[
                                { value: 'all', label: 'All Applications' },
                                { value: 'Approved', label: 'Approved ONLY' },
                                { value: 'Pending', label: 'Pending ONLY' },
                                { value: 'Rejected', label: 'Rejected ONLY' }
                            ]}
                            placeholder="Filter by status"
                        />
                    </div>
                </div>

                {/* Content Container */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                    {renderContent()}
                </div>
            </main>

            {/* Scratch Card Modal */}
            <ScratchCardModal 
                isOpen={isScratchOpen}
                onClose={() => setIsScratchOpen(false)}
                rewardAmount={currentReward}
                onComplete={handleScratchComplete}
            />

            {/* Detail View Modal */}
            <ModernModalLayout
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                title="Application Details"
                id={selectedItem?._id?.slice(-8).toUpperCase()}
                HeaderIcon={LuInfo}
            >
                {renderDetailModalContent()}
                <div className="mt-8">
                    <button 
                        onClick={() => setIsDetailOpen(false)}
                        className="w-full py-4 bg-brand-purple text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 active:scale-95 transition-all cursor-pointer"
                    >
                        Close Details
                    </button>
                </div>
            </ModernModalLayout>

            {/* Recharge Status Modal */}
            <RechargeStatusModal 
                isOpen={isRechargeDetailOpen}
                onClose={() => setIsRechargeDetailOpen(false)}
                recharge={selectedItem}
            />
        </div>
    );
};

export default UserHistory;
