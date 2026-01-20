import React, { useEffect } from 'react';
import { LuX, LuWallet, LuCoins, LuArrowRight, LuTrendingUp, LuArrowDownLeft } from 'react-icons/lu';

const RewardHistoryModal = ({ isOpen, onClose }) => {
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

    const transactions = [
        {
            id: 1,
            title: "+12 Points",
            desc: "Scratch Card Reward",
            date: "Today at 2:30 PM",
            amount: 12,
            type: "credit",
            icon: <LuCoins size={20} className="text-amber-600" />
        },
        {
            id: 2,
            title: "+5 Points",
            desc: "Scratch Card Reward",
            date: "Yesterday at 4:05 PM",
            amount: 5,
            type: "credit",
            icon: <LuCoins size={20} className="text-amber-600" />
        },
        {
            id: 3,
            title: "+220 Points",
            desc: "Prize Redemption",
            date: "Apr 17, 2024",
            amount: 220,
            type: "credit",
            icon: <LuTrendingUp size={20} className="text-emerald-600" />
        },
        {
            id: 4,
            title: "-500 Points",
            desc: "Wallet Withdrawal",
            date: "Apr 14, 2024",
            amount: -500,
            type: "debit",
            icon: <LuArrowDownLeft size={20} className="text-red-500" />
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-dark-purple/60 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[480px] bg-[#F4F6F8] rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
                    <h3 className="text-lg font-black text-gray-900">Reward History</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                    >
                        <LuX size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* Wallet Card */}
                    <div className="relative bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff] rounded-[24px] p-6 shadow-sm border border-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-[#6b21a8] font-black text-lg mb-1">My Wallet</h3>
                                <p className="text-[#9333ea] text-xs font-semibold uppercase tracking-wider opacity-70">Total Points Balance</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-4xl font-black text-[#581c87] tracking-tight">895</span>
                                    <span className="text-xl font-bold text-[#7e22ce]">Points</span>
                                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-sm ml-1 text-[10px]">💰</div>
                                </div>
                            </div>
                            {/* Wallet 3D Icon Representation */}
                            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl rotate-3 shadow-lg border-2 border-white/40 flex items-center justify-center">
                                <LuWallet className="text-white w-8 h-8" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button className="w-full py-3 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-[#6b21a8] text-sm font-black rounded-xl border border-white/50 transition-colors shadow-sm cursor-pointer">
                                Withdraw Points
                            </button>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h4 className="text-gray-800 font-bold text-sm">Recent Transactions</h4>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white shadow-sm ${tx.type === 'credit' ? 'bg-amber-50' : 'bg-red-50'}`}>
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${tx.type === 'credit' ? 'text-gray-900' : 'text-gray-900'}`}>{tx.title}</p>
                                            <p className="text-xs text-gray-400 font-medium">{tx.desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardHistoryModal;
