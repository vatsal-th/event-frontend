import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LuArrowLeft, LuLoader, LuFilter, LuCalendar, LuTrendingUp, LuTrendingDown,
    LuGift, LuUsers, LuCreditCard, LuSettings
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { fetchWalletTransactions, fetchWalletSummary } from '../store/slices/walletSlice';

const TransactionHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transactions, pagination, summary, loading, error } = useSelector((state) => state.wallet);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        dispatch(fetchWalletSummary());
        dispatch(fetchWalletTransactions({ page: currentPage, limit: 20 }));
    }, [dispatch, currentPage]);

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'referral_reward':
                return { icon: LuUsers, color: 'text-purple-600', bg: 'bg-purple-50' };
            case 'application_reward':
                return { icon: LuGift, color: 'text-green-600', bg: 'bg-green-50' };
            case 'withdrawal':
                return { icon: LuCreditCard, color: 'text-red-600', bg: 'bg-red-50' };
            case 'admin_adjustment':
                return { icon: LuSettings, color: 'text-blue-600', bg: 'bg-blue-50' };
            default:
                return { icon: LuGift, color: 'text-gray-600', bg: 'bg-gray-50' };
        }
    };

    const getTransactionTypeLabel = (type) => {
        const labels = {
            'referral_reward': 'Referral Reward',
            'application_reward': 'Application Reward',
            'withdrawal': 'Withdrawal',
            'admin_adjustment': 'Admin Adjustment'
        };
        return labels[type] || type;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading && !transactions.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <LuLoader className="animate-spin text-purple-600 mb-4" size={48} />
                    <p className="text-gray-600 font-medium">Loading transactions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-12">
            {/* Header */}
            <div className=" border-b border-gray-100 sticky top-20 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/wallet')}
                            className="p-2 rounded-xl transition-colors cursor-pointer"
                        >
                            <LuArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">Transaction History</h1>
                            <p className="text-sm text-gray-500">View all your wallet transactions</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 space-y-6">
                {/* Summary Cards */}
                {summary && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gray-500 uppercase">Current Balance</p>
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                    <LuTrendingUp className="text-purple-600" size={20} />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-gray-900">₹{summary.currentBalance || 0}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gray-500 uppercase">Total Earned</p>
                                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                    <LuTrendingUp className="text-green-600" size={20} />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-green-600">+₹{summary.totalEarned || 0}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gray-500 uppercase">Total Spent</p>
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                    <LuTrendingDown className="text-red-600" size={20} />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-red-600">-₹{summary.totalSpent || 0}</p>
                        </div>
                    </div>
                )}

                {/* Breakdown */}
                {summary?.breakdown && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 mb-4">Breakdown by Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-purple-50 rounded-xl">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Referral Rewards</p>
                                <p className="text-xl font-black text-purple-600">+₹{summary.breakdown.referralRewards || 0}</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Application Rewards</p>
                                <p className="text-xl font-black text-green-600">+₹{summary.breakdown.applicationRewards || 0}</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-xl">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Withdrawals</p>
                                <p className="text-xl font-black text-red-600">-₹{summary.breakdown.withdrawals || 0}</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Adjustments</p>
                                <p className="text-xl font-black text-blue-600">₹{summary.breakdown.adminAdjustments || 0}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900">All Transactions</h3>
                            <span className="text-sm text-gray-500">
                                {pagination?.totalRecords || 0} total
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="p-6 bg-red-50 border-b border-red-100">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    {transactions && transactions.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {transactions.map((transaction) => {
                                const iconConfig = getTransactionIcon(transaction.transactionType);
                                const Icon = iconConfig.icon;
                                const isPositive = transaction.amount > 0;

                                return (
                                    <div key={transaction._id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${iconConfig.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                                <Icon className={iconConfig.color} size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 truncate">{transaction.description}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-gray-500">
                                                        {getTransactionTypeLabel(transaction.transactionType)}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <LuCalendar size={12} />
                                                        {new Date(transaction.timestamp).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`text-right shrink-0 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                <p className="text-xl font-black">
                                                    {isPositive ? '+' : ''}₹{Math.abs(transaction.amount)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuGift className="text-gray-400" size={32} />
                            </div>
                            <p className="text-gray-900 font-bold text-lg mb-2">No Transactions Yet</p>
                            <p className="text-gray-500 text-sm">Your transaction history will appear here</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all ${currentPage === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer'
                                        }`}
                                >
                                    Previous
                                </button>

                                <span className="text-sm font-bold text-gray-600">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === pagination.totalPages}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all ${currentPage === pagination.totalPages
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg cursor-pointer'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
