import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuArrowLeft, LuArrowUpRight, LuClock, LuCheck, LuX, LuInfo, LuCalendar } from 'react-icons/lu';

const WithdrawalHistory = () => {
    const navigate = useNavigate();
    const { withdrawals } = useSelector((state) => state.wallet);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved':
                return {
                    bg: 'bg-green-50',
                    text: 'text-green-600',
                    border: 'border-green-100',
                    icon: <LuCheck size={16} />
                };
            case 'rejected':
                return {
                    bg: 'bg-red-50',
                    text: 'text-red-600',
                    border: 'border-red-100',
                    icon: <LuX size={16} />
                };
            default:
                return {
                    bg: 'bg-orange-50',
                    text: 'text-orange-600',
                    border: 'border-orange-100',
                    icon: <LuClock size={16} />
                };
        }
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-50 pb-12">
            {/* Mobile Header */}
            <div className="sticky top-20 max-w-2xl mx-auto z-30 px-4 py-4 flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <LuArrowLeft size={24} />
                </button>
                <h1 className="ml-2 text-xl font-bold text-gray-900">Withdrawal History</h1>
            </div>

            <div className="max-w-2xl mx-auto px-4">
                {withdrawals.length > 0 ? (
                    <div className="space-y-4">
                        {withdrawals.map((item) => {
                            const styles = getStatusStyles(item.status);
                            return (
                                <div key={item._id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:border-purple-100">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 ${styles.bg} ${styles.text} rounded-xl flex items-center justify-center`}>
                                                    <LuArrowUpRight size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-gray-900">₹{item.amount}</h3>
                                                    <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                        <LuCalendar size={12} className="mr-1" />
                                                        {formatDate(item.requestedAt)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles.bg} ${styles.text} ${styles.border}`}>
                                                {styles.icon}
                                                <span>{item.status}</span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-gray-400 font-medium">Bank Account</span>
                                                <span className="text-gray-700 font-bold">{item.bankAccount?.bankName} ({item.bankAccount?.accountNumber})</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400 font-medium">Transaction ID</span>
                                                <span className="text-gray-600 font-mono text-[10px]">{item._id.toUpperCase()}</span>
                                            </div>
                                        </div>

                                        {item.status === 'rejected' && item.rejectionReason && (
                                            <div className="mt-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 flex items-start space-x-3">
                                                <div className="text-red-600 mt-0.5">
                                                    <LuInfo size={14} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Reason for Rejection</p>
                                                    <p className="text-xs text-red-800 leading-relaxed font-medium">{item.rejectionReason}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LuHistory size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No History Yet</h3>
                        <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                            When you make withdrawal requests, they will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawalHistory;
