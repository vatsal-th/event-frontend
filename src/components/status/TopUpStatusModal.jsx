import React, { useEffect } from 'react';
import { LuX, LuTriangleAlert, LuDownload, LuUser, LuHash, LuCoins, LuCalendar, LuFileText, LuDollarSign, LuUserCheck } from 'react-icons/lu';
import Button from '../common/Button';

const TopUpStatusModal = ({ isOpen, onClose, onClaimReward }) => {
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

    const details = [
        { label: "User ID", value: "563785288", icon: <LuHash size={14} /> },
        { label: "User Nickname", value: "wanted Mafia", icon: <LuUser size={14} />, isHighlight: true },
        { label: "Top-Up Beans", value: "54,000 Beans", icon: <LuCoins size={14} />, valueColor: "text-amber-400" },
        { label: "Date", value: "2025/12/20 18:34:24", icon: <LuCalendar size={14} /> },
        { label: "Reference No", value: "10236336", icon: <LuFileText size={14} /> },
        { label: "Payment Paid", value: "₹500 INR", icon: <LuDollarSign size={14} /> },
        { label: "Agent ID", value: "14455", icon: <LuUserCheck size={14} /> },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-dark-purple/70 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[420px] bg-[#2d1b4e] rounded-[24px] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.2)] border border-white/10 animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white/5 border-b border-white/5">
                    <h3 className="text-lg font-black text-white tracking-wide">Top-Up Status</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-8 bg-gradient-to-b from-[#2d1b4e] to-[#1a0b2e]">

                    {/* Status Badge */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
                            <LuTriangleAlert className="text-red-500" size={20} />
                            <span className="text-red-400 font-bold">Payment Status: <span className="text-red-500 font-black uppercase">Rejected</span></span>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                        {details.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                                <div className="flex items-center space-x-2 text-white/60">
                                    {item.icon}
                                    <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
                                </div>
                                <div className={`flex items-center font-bold text-sm ${item.valueColor ? item.valueColor : 'text-white'}`}>
                                    {item.isHighlight && <div className="w-4 h-4 rounded-full bg-indigo-500 mr-2" />} {/* Mock Avatar */}
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 pt-2">
                        <button className="w-full py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/5 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer">
                            <LuDownload size={18} />
                            <span>Download Slip</span>
                        </button>

                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            <button
                                onClick={() => {
                                    onClose();
                                    if (onClaimReward) onClaimReward();
                                }}
                                className="relative w-full py-4 rounded-xl bg-gradient-to-r from-[#1a0b2e] to-[#2d1b4e] border border-amber-500/50 text-amber-400 font-black text-lg tracking-wide hover:text-amber-300 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                            >
                                <LuCoins className="text-amber-400" />
                                <span>Claim Your Scratch Card</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopUpStatusModal;
