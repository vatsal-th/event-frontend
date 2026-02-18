import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    LuArrowLeft, LuArrowUpRight, LuClock, LuCheck,
    LuX, LuInfo, LuCalendar, LuHistory, LuLoader,
    LuArrowRight, LuCircleAlert
} from 'react-icons/lu';
import { fetchWithdrawalHistory } from '../store/slices/walletSlice';

const WithdrawalHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { withdrawals, withdrawalPagination, loading, error } = useSelector((state) => state.wallet);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchWithdrawalHistory({ page: currentPage, limit: 10 }));
        // Scroll to top when page changes
        window.scrollTo(0, 0);
    }, [dispatch, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= (withdrawalPagination?.totalPages || 1)) {
            setCurrentPage(newPage);
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'approved':
                return {
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-600',
                    border: 'border-emerald-100',
                    badge: 'bg-emerald-500 text-white',
                    icon: <LuCheck size={14} />,
                    label: 'Success'
                };
            case 'rejected':
                return {
                    bg: 'bg-rose-50',
                    text: 'text-rose-600',
                    border: 'border-rose-100',
                    badge: 'bg-rose-500 text-white',
                    icon: <LuX size={14} />,
                    label: 'Rejected'
                };
            default:
                return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-600',
                    border: 'border-amber-100',
                    badge: 'bg-amber-500 text-white',
                    icon: <LuClock size={14} />,
                    label: 'Pending'
                };
        }
    };

    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    if (loading && withdrawals.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-100 border-t-brand-purple rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <LuHistory size={20} className="text-brand-purple" />
                    </div>
                </div>
                <p className="mt-4 text-gray-500 font-bold animate-pulse">Fetching your history...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header - Fixed on mobile */}
            <div className="bg-white border-b border-gray-100 sticky top-20 z-40 transition-shadow duration-300 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/wallet')}
                            className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-2xl transition-all cursor-pointer"
                        >
                            <LuArrowLeft size={24} />
                        </button>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">Withdrawal History</h1>
                    </div>
                    {withdrawalPagination?.totalRecords > 0 && (
                        <div className="bg-purple-50 px-3 py-1 rounded-full">
                            <span className="text-[10px] font-black text-brand-purple uppercase">
                                {withdrawalPagination.totalRecords} Requests
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 mt-6">
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3 text-rose-600">
                        <LuCircleAlert size={20} />
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                )}

                {withdrawals.length > 0 ? (
                    <div className="space-y-4">
                        {withdrawals.map((item) => {
                            const config = getStatusConfig(item.status);
                            return (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md active:scale-[0.98] group"
                                >
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 ${config.bg} ${config.text} rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                                                    <LuArrowUpRight size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm font-bold text-gray-400">₹</span>
                                                        <h3 className="text-2xl font-black text-gray-900">{item.amount.toLocaleString('en-IN')}</h3>
                                                    </div>
                                                    <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                        <LuCalendar size={12} className="mr-1.5" />
                                                        {formatDate(item.requestedAt)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${config.badge}`}>
                                                {config.icon}
                                                <span>{config.label}</span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">Bank Details</span>
                                                </div>
                                                <span className="text-xs text-gray-900 font-black">
                                                    {item.bankAccount?.bankName} •••• {item.bankAccount?.accountNumber?.slice(-4)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">Reference ID</span>
                                                </div>
                                                <span className="text-[10px] text-gray-600 font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
                                                    {item._id.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {item.status === 'rejected' && item.rejectionReason && (
                                            <div className="mt-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-start space-x-3">
                                                <div className="text-rose-600 mt-0.5 bg-white p-1 rounded-lg">
                                                    <LuInfo size={14} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Rejection Reason</p>
                                                    <p className="text-xs text-rose-800 leading-relaxed font-bold">{item.rejectionReason}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Pagination Bar */}
                        {withdrawalPagination && withdrawalPagination.totalPages > 1 && (
                            <div className="pt-8 pb-12">
                                <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`p-3 rounded-2xl transition-all ${currentPage === 1
                                                ? 'bg-gray-50 text-gray-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-brand-purple cursor-pointer'
                                            }`}
                                    >
                                        <LuArrowLeft size={20} />
                                    </button>

                                    <div className="flex items-center space-x-1">
                                        <span className="text-xs font-black text-gray-400">PAGE</span>
                                        <span className="text-lg font-black text-brand-purple">{currentPage}</span>
                                        <span className="text-xs font-black text-gray-400">OF</span>
                                        <span className="text-lg font-black text-gray-900">{withdrawalPagination.totalPages}</span>
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === withdrawalPagination.totalPages}
                                        className={`p-3 rounded-2xl transition-all ${currentPage === withdrawalPagination.totalPages
                                                ? 'bg-gray-50 text-gray-300'
                                                : 'bg-brand-purple text-white shadow-lg shadow-purple-200 cursor-pointer active:scale-90'
                                            }`}
                                    >
                                        <LuArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-gray-100 mt-10">
                        <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-[32px] flex items-center justify-center mx-auto mb-6 transition-transform hover:rotate-12">
                            <LuHistory size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No history found</h3>
                        <p className="text-sm text-gray-400 font-medium max-w-[240px] mx-auto leading-relaxed">
                            Your withdrawal requests will appear here once you make them.
                        </p>
                        <button
                            onClick={() => navigate('/wallet/withdraw')}
                            className="mt-8 bg-brand-purple text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-100 active:scale-95 transition-all cursor-pointer"
                        >
                            Withdraw Now
                        </button>
                    </div>
                )}
            </div>

            {/* Loading Indicator for subsequent pages */}
            {loading && withdrawals.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-gray-100 flex items-center space-x-3 z-50">
                    <LuLoader className="animate-spin text-brand-purple" size={20} />
                    <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default WithdrawalHistory;