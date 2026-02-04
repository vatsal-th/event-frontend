import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    LuMic,
    LuStar,
    LuUsers,
    LuInstagram,
    LuCalendar,
    LuClock,
    LuCheck,
    LuX,
    LuLoader,
    LuInfo,
    LuGift,
    LuMapPin
} from 'react-icons/lu';
import { getUserHistory } from '../api/userHistoryApi';

const UserHistory = () => {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab') || 'hosting';
    const [activeTab, setActiveTab] = useState(tabFromUrl);
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getUserHistory();

            if (response.success) {
                setHistoryData(response.data);
            } else {
                setError(response.message || 'Failed to load history');
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
        { id: 'agency', label: 'Agency', icon: LuUsers, color: 'indigo' },
        { id: 'influencers', label: 'Influencers', icon: LuInstagram, color: 'pink' }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            Pending: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-700',
                border: 'border-yellow-200',
                icon: LuClock
            },
            Approved: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                icon: LuCheck
            },
            Rejected: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                icon: LuX
            }
        };

        const config = statusConfig[status] || statusConfig.Pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const renderApplicationCard = (application, type) => {
        return (
            <div
                key={application._id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-black text-gray-900 mb-1">
                            {application.fullName || application.userId?.fullName || 'N/A'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <LuCalendar size={14} />
                            <span className="font-medium">{formatDate(application.createdAt)}</span>
                        </div>
                    </div>
                    {getStatusBadge(application.status)}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Mobile Number */}
                    {application.mobileNumber && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Mobile</span>
                            <span className="text-sm text-gray-900 font-medium">{application.mobileNumber}</span>
                        </div>
                    )}

                    {/* Country */}
                    {application.countryId && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Country</span>
                            <div className="flex items-center gap-1.5">
                                <LuMapPin size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-900 font-medium">
                                    {application.countryId?.name || application.countryId}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Gender */}
                    {application.gender && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Gender</span>
                            <span className="text-sm text-gray-900 font-medium">{application.gender}</span>
                        </div>
                    )}

                    {/* Type-specific fields */}
                    {type === 'hosting' && application.categoryId && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Category</span>
                            <span className="text-sm text-gray-900 font-medium">
                                {application.categoryId?.name || application.categoryId}
                            </span>
                        </div>
                    )}

                    {type === 'hosting' && application.talent && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Talent</span>
                            <span className="text-sm text-gray-900 font-medium">{application.talent}</span>
                        </div>
                    )}

                    {type === 'agency' && application.agencyName && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Agency Name</span>
                            <span className="text-sm text-gray-900 font-medium">{application.agencyName}</span>
                        </div>
                    )}

                    {type === 'agency' && application.minimumHostRequirement && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Min Host Req.</span>
                            <span className="text-sm text-gray-900 font-medium">{application.minimumHostRequirement}</span>
                        </div>
                    )}

                    {type === 'events' && application.budget && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Budget</span>
                            <span className="text-sm text-gray-900 font-medium">{application.budget}</span>
                        </div>
                    )}

                    {type === 'events' && application.eventDate && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Event Date</span>
                            <span className="text-sm text-gray-900 font-medium">{application.eventDate}</span>
                        </div>
                    )}

                    {type === 'influencers' && application.instagramFollowers && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Instagram Followers</span>
                            <span className="text-sm text-gray-900 font-medium">{application.instagramFollowers}</span>
                        </div>
                    )}

                    {type === 'influencers' && application.socialMediaId && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">Social Media ID</span>
                            <span className="text-sm text-gray-900 font-medium">{application.socialMediaId}</span>
                        </div>
                    )}

                    {/* App Name */}
                    {application.appId && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-bold mb-1">App</span>
                            <span className="text-sm text-gray-900 font-medium">
                                {application.appId?.appName || application.appId}
                            </span>
                        </div>
                    )}
                </div>

                {/* Reward Points (if approved) */}
                {application.status === 'Approved' && application.rewardPoints && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <LuGift size={18} />
                            <span className="text-sm font-bold">
                                Reward: {application.rewardPoints} points
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-20">
                    <LuLoader className="animate-spin text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 font-medium">Loading your history...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="bg-red-50 rounded-full p-4 mb-4">
                        <LuInfo className="text-red-500" size={32} />
                    </div>
                    <p className="text-gray-900 font-bold text-lg mb-2">Error Loading History</p>
                    <p className="text-gray-500 text-sm mb-6">{error}</p>
                    <button
                        onClick={fetchHistory}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        const currentData = historyData?.[activeTab] || [];

        if (currentData.length === 0) {
            const TabIcon = tabs.find(t => t.id === activeTab)?.icon || LuInfo;
            return (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="bg-gray-50 rounded-full p-4 mb-4">
                        <TabIcon className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-900 font-bold text-lg mb-2">No Applications Yet</p>
                    <p className="text-gray-500 text-sm">
                        You haven't submitted any {activeTab} applications.
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {currentData.map(app => renderApplicationCard(app, activeTab))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                        Application History
                    </h1>
                    <p className="text-gray-600 font-medium">
                        Track all your submitted applications
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-6 sm:mb-8 overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0 px-4 sm:px-0">
                    <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:justify-center">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const count = historyData?.[tab.id]?.length || 0;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${isActive
                                        ? tab.color === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg scale-105' :
                                            tab.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105' :
                                                tab.color === 'indigo' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg scale-105' :
                                                    'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="whitespace-nowrap">{tab.label}</span>
                                    {count > 0 && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-black ${isActive ? 'bg-white/20' : 'bg-gray-100'
                                            }`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-white/60 shadow-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default UserHistory;
