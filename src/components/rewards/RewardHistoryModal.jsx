import React, { useEffect, useState } from 'react';
import {
    LuX,
    LuWallet,
    LuCoins,
    LuMic,
    LuStar,
    LuUsers,
    LuInstagram,
    LuLoader,
    LuInfo,
    LuGift,
    LuMapPin,
    LuCalendar
} from 'react-icons/lu';
import { getUserHistory } from '../../api/userHistoryApi';

const RewardHistoryModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rewardData, setRewardData] = useState(null);

    // Prevent background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            fetchRewardHistory();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const fetchRewardHistory = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getUserHistory();

            if (response.success) {
                // Extract all applications with reward points
                const allRewards = [];
                const data = response.data;

                const processApps = (apps, type) => {
                    if (apps) {
                        apps.forEach(app => {
                            if (app.rewardPoints > 0) {
                                allRewards.push({ ...app, type });
                            }
                        });
                    }
                };

                processApps(data.hosting, 'Hosting');
                processApps(data.events, 'Events');
                processApps(data.agency, 'Agency');
                processApps(data.influencers, 'Influencers');

                // Sort by newest first
                allRewards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Calculate total reward points (only for approved)
                const totalRewardPoints = allRewards
                    .filter(app => app.status === 'Approved')
                    .reduce((sum, app) => sum + (app.rewardPoints || 0), 0);

                setRewardData({
                    rewards: allRewards,
                    totalRewardPoints,
                    currentUserPoints: 732 // This should come from user state/API
                });
            } else {
                setError(response.message || 'Failed to load reward history');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching reward history');
        } finally {
            setLoading(false);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Hosting': return <LuMic size={20} className="text-purple-600" />;
            case 'Events': return <LuStar size={20} className="text-blue-600" />;
            case 'Agency': return <LuUsers size={20} className="text-indigo-600" />;
            case 'Influencers': return <LuInstagram size={20} className="text-pink-600" />;
            default: return <LuGift size={20} className="text-gray-600" />;
        }
    };

    const getTypeBgColor = (type) => {
        switch (type) {
            case 'Hosting': return 'bg-purple-50';
            case 'Events': return 'bg-blue-50';
            case 'Agency': return 'bg-indigo-50';
            case 'Influencers': return 'bg-pink-50';
            default: return 'bg-gray-50';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[520px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <h3 className="text-lg font-black">Reward History</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <LuLoader className="animate-spin text-purple-600 mb-4" size={48} />
                            <p className="text-gray-500 font-medium">Loading reward history...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="bg-red-50 rounded-full p-4 mb-4">
                                <LuInfo className="text-red-500" size={32} />
                            </div>
                            <p className="text-gray-900 font-bold text-lg mb-2">Error Loading History</p>
                            <p className="text-gray-500 text-sm mb-6">{error}</p>
                            <button
                                onClick={fetchRewardHistory}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Wallet Card */}
                            <div className="relative bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff] rounded-[24px] p-6 shadow-sm border border-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[#6b21a8] font-black text-lg mb-1">Total Rewards Earned</h3>
                                        <p className="text-[#9333ea] text-xs font-semibold uppercase tracking-wider opacity-70">From Approved Applications</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-4xl font-black text-[#581c87] tracking-tight">
                                                {rewardData?.totalRewardPoints || 0}
                                            </span>
                                            <span className="text-xl font-bold text-[#7e22ce]">Points</span>
                                            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-sm ml-1 text-[10px]">💰</div>
                                        </div>
                                    </div>
                                    {/* Wallet 3D Icon Representation */}
                                    <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl rotate-3 shadow-lg border-2 border-white/40 flex items-center justify-center">
                                        <LuWallet className="text-white w-8 h-8" />
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-purple-200/50">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#6b21a8] text-sm font-bold">Current Balance</span>
                                        <span className="text-[#581c87] text-lg font-black">{rewardData?.currentUserPoints || 0} Points</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reward List */}
                            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                    <h4 className="text-gray-800 font-bold text-sm">Reward Transactions</h4>
                                    <span className="text-xs font-bold text-gray-500">{rewardData?.rewards?.length || 0} Total</span>
                                </div>

                                {rewardData?.rewards?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="bg-gray-50 rounded-full p-4 mb-4">
                                            <LuGift className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-900 font-bold text-lg mb-2">No Rewards Yet</p>
                                        <p className="text-gray-500 text-sm">
                                            Submit applications to earn rewards!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-50">
                                        {rewardData?.rewards?.map((reward) => (
                                            <div key={reward._id} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white shadow-sm ${getTypeBgColor(reward.type)}`}>
                                                            {getTypeIcon(reward.type)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-gray-900">
                                                                +{reward.rewardPoints} Points
                                                            </p>
                                                            <p className="text-xs text-gray-500 font-medium">{reward.type} Application</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border shadow-sm ${reward.status === 'Approved'
                                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                                : reward.status === 'Rejected'
                                                                    ? 'bg-red-50 text-red-600 border-red-100'
                                                                    : 'bg-blue-50 text-blue-600 border-blue-100'
                                                            }`}>
                                                            {reward.status}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ml-13 space-y-1">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <LuCalendar size={12} />
                                                        <span className="font-medium">{formatDate(reward.createdAt)}</span>
                                                    </div>
                                                    {reward.fullName && (
                                                        <div className="text-xs text-gray-600 font-medium">
                                                            Name: {reward.fullName}
                                                        </div>
                                                    )}
                                                    {reward.countryId?.name && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                                            <LuMapPin size={12} />
                                                            <span className="font-medium">{reward.countryId.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RewardHistoryModal;
