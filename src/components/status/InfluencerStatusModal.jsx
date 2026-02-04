import React, { useEffect, useState } from 'react';
import { LuX, LuBadgeCheck, LuGift, LuShare2, LuLoader, LuInfo, LuClock } from 'react-icons/lu';
import Button from '../common/Button';
import { getLatestStatus } from '../../api/userHistoryApi';

const InfluencerStatusModal = ({ isOpen, onClose, onClaimReward }) => {
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            fetchInfluencerApplications();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const fetchInfluencerApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getLatestStatus();
            if (response.success) {
                setApplication(response.data.influencer || null);
            } else {
                setError('Failed to load influencer applications');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const config = {
            Approved: {
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
                text: 'text-emerald-600',
                icon: <LuBadgeCheck size={16} className="text-emerald-600" />
            },
            Pending: {
                bg: 'bg-yellow-50',
                border: 'border-yellow-100',
                text: 'text-yellow-600',
                icon: <LuClock size={16} className="text-yellow-600" />
            },
            Rejected: {
                bg: 'bg-red-50',
                border: 'border-red-100',
                text: 'text-red-600',
                icon: <LuX size={16} className="text-red-600" />
            }
        };
        return config[status] || config.Pending;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-[520px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                    <h3 className="text-lg font-black tracking-tight">Influencer Applications</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <LuLoader className="animate-spin text-pink-600 mb-4" size={48} />
                            <p className="text-gray-500 font-medium">Loading applications...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="bg-red-50 rounded-full p-4 mb-4">
                                <LuInfo className="text-red-500" size={32} />
                            </div>
                            <p className="text-gray-900 font-bold text-lg mb-2">Error Loading Data</p>
                            <p className="text-gray-500 text-sm mb-6">{error}</p>
                            <button
                                onClick={fetchInfluencerApplications}
                                className="px-6 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : !application ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="bg-gray-50 rounded-full p-4 mb-4">
                                <LuInfo className="text-gray-400" size={32} />
                            </div>
                            <p className="text-gray-900 font-bold text-lg mb-2">No Applications Yet</p>
                            <p className="text-gray-500 text-sm">
                                You haven't submitted any influencer applications.
                            </p>
                        </div>
                    ) : (
                        (() => {
                            const statusConfig = getStatusBadge(application.status);
                            return (
                                <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
                                    {/* Status Badge */}
                                    <div className={`flex items-center justify-center space-x-2 ${statusConfig.bg} border-b ${statusConfig.border} px-4 py-3`}>
                                        {statusConfig.icon}
                                        <span className="text-gray-600 text-sm font-bold">Status:</span>
                                        <span className={`${statusConfig.text} font-black uppercase text-sm`}>{application.status}</span>
                                    </div>

                                    {/* Application Details */}
                                    <div className="p-4 space-y-2">
                                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Full Name</span>
                                            <span className="font-bold text-sm text-gray-900">{application.fullName}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Mobile</span>
                                            <span className="font-bold text-sm text-gray-900">{application.mobileNumber}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Country</span>
                                            <span className="font-bold text-sm text-gray-900">{application.countryId?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Gender</span>
                                            <span className="font-bold text-sm text-gray-900">{application.gender}</span>
                                        </div>
                                        {application.platform && (
                                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Platform</span>
                                                <span className="font-bold text-sm text-gray-900">{application.platform}</span>
                                            </div>
                                        )}
                                        {application.followers && (
                                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Followers</span>
                                                <span className="font-bold text-sm text-gray-900">{application.followers}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Submitted</span>
                                            <span className="font-bold text-sm text-gray-900">{formatDate(application.createdAt)}</span>
                                        </div>
                                        {application.rewardPoints > 0 && application.isScratched && (
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Reward Points</span>
                                                <span className="font-black text-sm text-emerald-600">+{application.rewardPoints} Points</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Scratch Card Section - Only for Approved and NOT Scratched */}
                                    {application.status === 'Approved' && !application.isScratched && (
                                        <div className="p-4 border-t border-gray-100">
                                            <div
                                                onClick={() => onClaimReward(application._id, 'influencer', application.rewardPoints)}
                                                className="bg-amber-50 border border-amber-100 rounded-[16px] p-4 flex items-center gap-3 cursor-pointer hover:bg-amber-100/50 transition-colors group"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition-colors">
                                                    <LuGift size={20} className="text-amber-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-900 font-black text-sm">Claim Your Scratch Card!</p>
                                                    <p className="text-gray-600 text-xs font-medium">
                                                        Earn rewards for approved application
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()
                    )}

                    {/* Invite Section */}
                    {application && (
                        <Button variant="white" className="w-full rounded-2xl py-3 gap-2 mt-4 cursor-pointer">
                            <LuShare2 size={16} />
                            Invite & Earn
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfluencerStatusModal;
