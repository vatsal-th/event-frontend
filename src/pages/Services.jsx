import React, { useState } from 'react';
import { LuCalendar, LuWallet, LuCoins, LuMic, LuUsers, LuGift, LuArrowRight, LuCircleCheck, LuClock, LuStar } from 'react-icons/lu';
import Button from '../components/common/Button';

const Services = () => {
    const [activeTab, setActiveTab] = useState('billing');

    const statusCards = [
        {
            title: 'Event Status',
            desc: 'Awaiting admin approval...',
            update: 'April 17, 2024',
            status: 'Awaiting Approval',
            statusType: 'awaiting',
            icon: <LuCalendar size={32} className="text-orange-500" />,
            bgColor: 'bg-white'
        },
        {
            title: 'Top Up Status',
            desc: 'Your top-up has been approved.',
            update: 'April 16, 2024',
            status: 'Approved',
            statusType: 'approved',
            icon: <LuWallet size={32} className="text-blue-500" />,
            bgColor: 'bg-white'
        },
        {
            title: 'Salary Status',
            desc: 'Salary has been credited to wallet.',
            update: 'April 15, 2024',
            status: 'Completed',
            statusType: 'completed',
            icon: <LuCoins size={32} className="text-emerald-500" />,
            bgColor: 'bg-white'

        },
        {
            title: 'Hosting Status',
            desc: 'Last updated: April 14, 2024',
            update: 'April 14, 2024',
            status: 'Awaiting Approval',
            statusType: 'awaiting',
            icon: <LuMic size={32} className="text-indigo-500" />,
            bgColor: 'bg-white'

        },
        {
            title: 'Agency Status',
            desc: 'Last updated: April 12, 2024',
            update: 'April 12, 2024',
            status: 'Awaiting Approval',
            statusType: 'awaiting',
            icon: <LuUsers size={32} className="text-purple-500" />,
            bgColor: 'bg-white'

        },
        {
            title: 'Scratch Card History',
            desc: 'View your previous rewards',
            update: '',
            status: 'View All',
            statusType: 'action',
            icon: <LuGift size={32} className="text-amber-500" />,
            bgColor: 'bg-white'

        }
    ];

    const getStatusStyle = (type) => {
        switch (type) {
            case 'awaiting': return 'bg-[#e3ecff] text-[#2866eb] border-[#c3d6ff]';
            case 'approved': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'completed': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'action': return 'bg-indigo-500 text-white border-indigo-500';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusIcon = (type) => {
        switch (type) {
            case 'awaiting': return <LuClock size={14} className="mr-1" />;
            case 'approved': return <LuCircleCheck size={14} className="mr-1" />;
            case 'completed': return <LuCircleCheck size={14} className="mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">My Services</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">Track the status of your services and earn scratch card rewards!</p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {statusCards.map((card, idx) => (
                    <div key={idx} className="group relative bg-[#F4F6F8] rounded-[20px] p-6 border border-gray-100 hover:shadow-md hover:border-brand-purple/20 transition-all duration-500 cursor-pointer">
                        {/* Status Badge - Top Right */}
                        {card.statusType !== 'action' && (
                            <div className={`absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full font-semibold text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(card.statusType)} z-10`}>
                                {getStatusIcon(card.statusType)}
                                {card.status}
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                            <div className="flex space-x-4 items-center">
                                <div className={`w-14 h-14 ${card.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{card.title}</h3>
                                    <p className="text-gray-500 text-sm">{card.desc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {card.statusType === 'action' ? (
                                <div className="pt-4 border-t border-[#EAECEF]">
                                    <Button variant="primary" className="w-full w-fit py-2 text-xs font-bold uppercase tracking-wider rounded-xl">
                                        {card.status}
                                    </Button>
                                </div>
                            ) : card.update && (
                                <div className="pt-4 border-t border-[#EAECEF] flex items-center justify-between text-[13px] text-gray-400 font-bold">
                                    <span>Last updated: {card.update}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scratch Card Rewards Section */}
            <div className="bg-gradient-to-br from-violet-50 via-white to-pink-50 rounded-[20px] p-8 md:p-16 border border-white shadow-sm relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                            Scratch Card Rewards
                        </h2>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'billing', label: 'Billing Status' },
                                { id: 'influencers', label: 'Influencers Status' },
                                { id: 'invite', label: 'Invite Status' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-black transition-all cursor-pointer ${activeTab === tab.id
                                        ? 'bg-brand-purple text-white shadow-lg shadow-purple-200 ring-1 ring-purple-500/20'
                                        : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-100'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900">Get 400 to 5 Points Randomly After Approval!</h3>
                            <p className="text-gray-500 leading-relaxed max-w-lg">
                                After your service is approved, you'll receive a scratch card reward.
                                Scratch to reveal random points!
                            </p>
                            <Button variant="primary" className="px-10 py-4 shadow-xl shadow-purple-200 group">
                                Check Rewards
                                <LuArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Reward Card Visual */}
                    <div className="flex justify-center">
                        <div className="relative group cursor-pointer pointer-events-auto">

                            <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 p-1 lg:p-1.5 rounded-[2.5rem] shadow-2xl transition-transform duration-500">
                                <div className="bg-white/40 backdrop-blur-md rounded-[2.2rem] p-8 md:p-12 text-center space-y-6 border border-white/40">
                                    <p className="text-2xl font-black text-white italic tracking-tighter drop-shadow-md">You Won!</p>
                                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl py-6 px-12 shadow-inner border border-white">
                                        <p className="text-4xl md:text-5xl font-black text-brand-dark-purple tracking-tight">
                                            + 3 Points
                                        </p>
                                    </div>
                                    <p className="text-white/80 font-bold text-sm">Tap to claim reward</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
