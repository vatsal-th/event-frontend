import React, { useState, useEffect } from 'react';
import { LuX, LuTriangleAlert, LuDownload, LuUser, LuHash, LuCoins, LuCalendar, LuFileText, LuDollarSign, LuUserCheck, LuLoader, LuClock, LuCheck, LuInfo } from 'react-icons/lu';
import { getLatestStatus } from '../../api/userHistoryApi';
import dayjs from 'dayjs';

const TopUpStatusModal = ({ isOpen, onClose, onClaimReward }) => {
    const [loading, setLoading] = useState(true);
    const [topupData, setTopupData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getLatestStatus();
            if (res.success && res.data.topup) {
                setTopupData(res.data.topup);
            }
        } catch (err) {
            console.error("Failed to fetch status:", err);
        } finally {
            setLoading(false);
        }
    };

    // Prevent background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { 
                    color: 'text-emerald-500', 
                    bg: 'bg-emerald-50', 
                    border: 'border-emerald-100', 
                    icon: <LuCheck className="text-white" size={12} strokeWidth={4} />, 
                    iconBg: 'bg-emerald-500' 
                };
            case 'pending':
                return { 
                    color: 'text-amber-500', 
                    bg: 'bg-amber-50', 
                    border: 'border-amber-100', 
                    icon: <LuClock className="text-white" size={12} strokeWidth={4} />, 
                    iconBg: 'bg-amber-500' 
                };
            case 'rejected':
                return { 
                    color: 'text-rose-500', 
                    bg: 'bg-rose-50', 
                    border: 'border-rose-100', 
                    icon: <LuX className="text-white" size={12} strokeWidth={4} />, 
                    iconBg: 'bg-rose-500' 
                };
            default:
                return { 
                    color: 'text-gray-500', 
                    bg: 'bg-gray-50', 
                    border: 'border-gray-100', 
                    icon: <LuInfo className="text-white" size={12} strokeWidth={4} />, 
                    iconBg: 'bg-gray-500' 
                };
        }
    };

    const statusConfig = getStatusConfig(topupData?.status);

    const details = topupData ? [
        { label: "User ID", value: topupData.targetUserId },
        { label: "User Nickname", value: topupData.targetUserName, isHighlight: true, icon: <LuUser className="text-indigo-500 mr-1" size={16} /> },
        { label: `Top-Up ${topupData.walletType}`, value: `${topupData.amount} ${topupData.walletType}`, icon: <LuCoins className="text-amber-400 mr-1" size={16} />, valueColor: "text-amber-500" },
        { label: "Date", value: dayjs(topupData.createdAt).format('YYYY/MM/DD HH:mm:ss') },
        { label: "Reference No", value: topupData.transactionId?.substring(0, 10).toUpperCase() || 'N/A' },
        { label: "App", value: topupData.appId?.appName || 'N/A' },
        { label: "Agent Code", value: topupData.agentCode },
    ] : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[420px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <h3 className="text-lg font-black tracking-tight">Top-Up Status</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <LuLoader className="animate-spin text-purple-500" size={40} />
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Fetching Status...</p>
                        </div>
                    ) : !topupData ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                <LuFileText size={32} />
                            </div>
                            <p className="text-gray-500 font-bold">No Top-up record found</p>
                        </div>
                    ) : (
                        <>
                            {/* Status Badge */}
                            <div className="flex justify-center">
                                <div className={`flex items-center space-x-2 ${statusConfig.bg} border ${statusConfig.border} px-4 py-2 rounded-full`}>
                                    <div className={`w-5 h-5 rounded-full ${statusConfig.iconBg} flex items-center justify-center text-white shadow-sm`}>
                                        {statusConfig.icon}
                                    </div>
                                    <span className="text-gray-600 text-sm font-bold tracking-tight">Payment Status: <span className={`${statusConfig.color} font-black ml-1 uppercase`}>{topupData.status}</span></span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">
                                {details.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                        <div className={`flex items-center font-bold text-sm ${item.valueColor ? item.valueColor : 'text-gray-900'} text-right`}>
                                            {item.icon}
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="pt-2">
                                <button className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm">
                                    <LuDownload size={18} />
                                    <span>Download Slip</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopUpStatusModal;
