import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuPlus, LuHistory, LuSend, LuDownload, LuWallet, LuChevronRight, LuInfo } from 'react-icons/lu';
import Button from '../components/common/Button';

const Wallet = () => {
    const navigate = useNavigate();
    const { balance, bankAccounts, withdrawals } = useSelector((state) => state.wallet);

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
                            {balance.toLocaleString('en-IN')}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-10 max-w-sm">
                            <button
                                onClick={() => navigate('/wallet/withdraw')}
                                className="bg-white text-brand-purple py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/20 active:scale-95 transition-all cursor-pointer"
                            >
                                <LuSend size={20} />
                                <span>Withdraw</span>
                            </button>
                            <button
                                onClick={() => navigate('/wallet/add-bank')}
                                className="bg-purple-600/50 hover:bg-purple-600 border border-white/20 text-white py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95 transition-all cursor-pointer" 
                            >
                                <LuPlus size={20} />
                                <span>Add Bank</span>
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
                        { label: 'Accounts', value: bankAccounts.length },
                        { label: 'History', value: withdrawals.length },
                        { label: 'Pending', value: withdrawals.filter(w => w.status === 'pending').length }
                    ].map((stat, index) => (
                        <div key={stat.label} className={`text-center ${index === 1 ? 'border-x border-gray-100' : ''}`}>
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mb-1">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Secondary Actions List */}
                <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">Management</p>

                    {[
                        {
                            type: 'button',
                            icon: LuHistory,
                            iconBg: 'bg-blue-50 text-blue-600',
                            title: 'Transaction History',
                            description: 'View all your withdrawal requests',
                            onClick: () => navigate('/wallet/history')
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
