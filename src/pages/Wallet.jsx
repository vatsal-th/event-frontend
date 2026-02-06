import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletSummary } from '../store/slices/walletSlice';
import { fetchBankDetails, removeBankDetails } from '../store/slices/bankSlice';
import { LuPlus, LuHistory, LuSend, LuDownload, LuWallet, LuChevronRight, LuInfo, LuLoader, LuX, LuCheck } from 'react-icons/lu';

const Wallet = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { balance, withdrawals, summary, loading: walletLoading } = useSelector((state) => state.wallet);
    const { details: bankDetails, loading: bankLoading } = useSelector((state) => state.bank);

    useEffect(() => {
        dispatch(fetchWalletSummary());
        dispatch(fetchBankDetails());
    }, [dispatch]);

    const handleDeleteBank = async () => {
        if (window.confirm('Are you sure you want to delete these bank details?')) {
            await dispatch(removeBankDetails());
        }
    };

    // Use summary data if available, otherwise fall back to static balance
    const currentBalance = summary?.currentBalance ?? balance;
    const totalTransactions = summary?.totalTransactions ?? 0;

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-50 pb-12">
            {/* Header / Balance Card - Mobile First */}
            <div className="bg-brand-purple pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                            <LuWallet className="text-3xl" />
                        </div>
                        <p className="text-purple-100 text-sm font-medium uppercase tracking-widest mb-1">Available Rewards</p>
                        <h1 className="text-5xl font-extrabold flex items-start">
                            <span className="text-2xl mt-1 mr-1">₹</span>
                            {(walletLoading && !summary) ? (
                                <LuLoader className="animate-spin text-white ml-2" size={40} />
                            ) : (
                                currentBalance.toLocaleString('en-IN')
                            )}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-10 max-w-sm">
                            <button
                                onClick={() => navigate('/wallet/withdraw')}
                                className="bg-white text-brand-purple py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                                disabled={!bankDetails}
                            >
                                <LuSend size={20} />
                                <span>Withdraw</span>
                            </button>
                            <button
                                onClick={() => navigate('/wallet/add-bank')}
                                className="bg-purple-600/50 hover:bg-purple-600 border border-white/20 text-white py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
                            >
                                {bankDetails ? <LuPlus size={20} /> : <LuPlus size={20} />}
                                <span>{bankDetails ? 'Edit Bank' : 'Add Bank'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
                {/* Quick Stats Area */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 mb-8 border border-gray-100 grid grid-cols-3 gap-2">
                    {[
                        { label: 'Verified', value: bankDetails?.isVerified ? 'Yes' : 'No' },
                        { label: 'History', value: withdrawals.length },
                        { label: 'Pending', value: withdrawals.filter(w => w.status === 'pending').length }
                    ].map((stat, index) => (
                        <div key={stat.label} className={`text-center ${index === 1 ? 'border-x border-gray-100' : ''}`}>
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mb-1">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Bank Account Details Card if exists */}
                {bankDetails && (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Primary Bank Account</h3>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-xl font-black text-gray-900">{bankDetails.bankName}</p>
                                        {bankDetails.status === 'approved' && <LuCheck className="text-green-500" size={18} />}
                                        {bankDetails.status === 'rejected' && <LuX className="text-red-500" size={18} />}
                                        {bankDetails.status === 'pending' && <LuLoader className="text-orange-500 animate-spin" size={16} />}
                                    </div>
                                </div>
                                {bankDetails.status === 'rejected' && (
                                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 bg-red-50 text-red-600">
                                        <LuX size={12} />
                                        <span>Rejected</span>
                                    </div>
                                )}
                                {bankDetails.status === 'pending' && (
                                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100 bg-orange-50 text-orange-600">
                                        <LuLoader size={12} className="animate-spin" />
                                        <span>Pending Verification</span>
                                    </div>
                                )}
                            </div>

                            {bankDetails.status === 'rejected' && bankDetails.rejectionReason && (
                                <div className="mt-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 flex items-start space-x-3">
                                    <div className="text-red-600 mt-0.5">
                                        <LuInfo size={14} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Reason for Rejection</p>
                                        <p className="text-xs text-red-800 leading-relaxed font-medium">{bankDetails.rejectionReason}</p>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Account Holder</span>
                                    <span className="font-bold text-gray-800">{bankDetails.accountHolderName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Account Number</span>
                                    <span className="font-mono font-bold text-gray-800">
                                        {bankDetails.accountNumber.replace(/.(?=.{4})/g, '•')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">IFSC Code</span>
                                    <span className="font-mono font-bold text-gray-800">{bankDetails.ifscCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Secondary Actions List */}
                <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">Management</p>

                    {[
                        {
                            type: 'button',
                            icon: LuHistory,
                            iconBg: 'bg-blue-50 text-blue-600',
                            title: 'Transaction History',
                            description: 'View all your wallet transactions',
                            onClick: () => navigate('/wallet/transactions')
                        },
                        {
                            type: 'button',
                            icon: LuPlus,
                            iconBg: 'bg-green-50 text-green-600',
                            title: 'Bank Accounts',
                            description: 'Manage where you receive rewards',
                            onClick: () => navigate('/wallet/add-bank')
                        },
                        {
                            type: 'info',
                            title: 'How it works?',
                            description: 'Your earned rewards are added to your wallet. You can transfer them to your verified bank account. Withdrawals usually take 24-48 business hours to process.'
                        }
                    ].map((action, index) => (
                        action.type === 'button' ? (
                            <button
                                key={action.title}
                                onClick={action.onClick}
                                className="w-full bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 group active:bg-gray-50 cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <action.icon size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-800">{action.title}</h3>
                                        <p className="text-xs text-gray-500">{action.description}</p>
                                    </div>
                                </div>
                                <LuChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <div key={action.title} className="bg-purple-50 p-6 rounded-3xl border border-purple-100 mt-8">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-purple shadow-sm shrink-0">
                                        <LuInfo size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-900 text-sm mb-1">{action.title}</h4>
                                        <p className="text-xs text-purple-700 leading-relaxed">{action.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
