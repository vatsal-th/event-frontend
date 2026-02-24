import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import { 
    LuUsers, LuMic, LuStar, LuGift, 
    LuShare2, LuWallet, LuHistory, LuTrendingUp, 
    LuUserCheck, LuShield, LuActivity, LuGem, LuPlus
} from 'react-icons/lu';
import { getDashboardStats } from '../api/dashboardApi';
import Button from '../components/common/Button';
import ApplyForEventModal from '../components/status/ApplyForEventModal';
import ApplyForInfluencerModal from '../components/status/ApplyForInfluencerModal';
import ApplyForAgencyModal from '../components/status/ApplyForAgencyModal';
import ApplyForHostingModal from '../components/status/ApplyForHostingModal';
import TopUpModal from '../components/status/TopUpModal';
import RechargeWalletModal from '../components/status/RechargeWalletModal';
import RechargeStatusModal from '../components/status/RechargeStatusModal';
import { getMyRechargeHistory } from '../api/rechargeApi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplyEventOpen, setIsApplyEventOpen] = useState(false);
    const [isApplyInfluencerOpen, setIsApplyInfluencerOpen] = useState(false);
    const [isApplyAgencyOpen, setIsApplyAgencyOpen] = useState(false);
    const [isApplyHostingOpen, setIsApplyHostingOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isRechargeOpen, setIsRechargeOpen] = useState(false);
    const [isRechargeStatusOpen, setIsRechargeStatusOpen] = useState(false);
    const [latestRecharge, setLatestRecharge] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const [statsRes, rechargeRes] = await Promise.all([
                getDashboardStats(),
                getMyRechargeHistory()
            ]);

            if (statsRes.success) {
                setStats(statsRes.data);
            }
            if (rechargeRes.success && rechargeRes.data?.length > 0) {
                setLatestRecharge(rechargeRes.data[0]);
            }
        } catch (err) {
            console.error("Dashboard Stats Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Earnings', value: stats?.totalEarnings || 0, icon: <LuTrendingUp />, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Total Reward Points' },
        { label: 'Total Invites', value: stats?.totalInvites || 0, icon: <LuUsers />, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'People Referred' },
        { label: 'Influencers', value: stats?.totalInfluencers || 0, icon: <LuUserCheck />, color: 'text-pink-600', bg: 'bg-pink-50', desc: 'Approved Creator' },
        { label: 'Agencies', value: stats?.totalAgency || 0, icon: <LuShield />, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: 'Approved Agencies' },
        { label: 'Total Hosts', value: stats?.totalHosts || 0, icon: <LuMic />, color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Live Broadcasters' },
        { label: 'Play Events', value: stats?.totalPlayEvents || 0, icon: <LuStar />, color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Hosted Events' },
        { label: 'Top-Ups', value: stats?.totalTopUps || 0, icon: <LuGem />, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'Total Approved' },
    ];

    const categories = [
        {
            title: 'Apply for Hosting',
            desc: 'Become a live host & earn',
            icon: <LuMic className="text-purple-600" />,
            action: 'Apply Now',
            color: 'bg-purple-50',
            onClick: () => setIsApplyHostingOpen(true),
            showHistory: true,
            historyTab: 'hosting'
        },
        {
            title: 'Apply for Event',
            desc: 'Host or join events',
            icon: <LuStar className="text-blue-600" />,
            action: 'Apply Now',
            color: 'bg-blue-50',
            onClick: () => setIsApplyEventOpen(true),
            showHistory: true,
            historyTab: 'events'
        },
        {
            title: 'Apply for Agency',
            desc: 'Start your own agency',
            icon: <LuUsers className="text-indigo-600" />,
            action: 'Apply Now',
            color: 'bg-indigo-50',
            onClick: () => setIsApplyAgencyOpen(true),
            showHistory: true,
            historyTab: 'agency'
        },
        {
            title: 'Top Up For User',
            desc: 'Securely recharge user balances',
            icon: <LuWallet className="text-orange-600" />,
            action: 'Top Up Now',
            color: 'bg-orange-50',
            btnVariant: 'secondary',
            onClick: () => setIsTopUpOpen(true)
        },
        {
            title: 'Apply for Influencers',
            desc: 'Reach brands as influencer',
            icon: <LuShare2 className="text-pink-600" />,
            action: 'Apply Now',
            color: 'bg-pink-50',
            onClick: () => setIsApplyInfluencerOpen(true),
            showHistory: true,
            historyTab: 'influencers'
        },
        {
            title: 'Recharge Wallet',
            desc: latestRecharge 
                ? `Last: ₹${latestRecharge.amount} (${latestRecharge.status})`
                : 'Add balance to your wallet',
            icon: <LuWallet className="text-brand-purple" />,
            action: 'Recharge Now',
            color: 'bg-purple-50',
            onClick: () => setIsRechargeOpen(true),
            showHistory: true,
            historyTab: 'recharges',
            onHistoryClick: () => {
                if (latestRecharge) {
                    setIsRechargeStatusOpen(true);
                    return true; // handled
                }
                return false;
            }
        },
        {
            title: 'Invite Friends & Earn Rewards',
            desc: 'Invite friends & earn rewards',
            icon: <LuGift className="text-emerald-600" />,
            action: 'Invite Now',
            color: 'bg-emerald-50',
            isWide: true,
            onClick: () => navigate('/invite')
        },
    ];

    return (
        <div className="space-y-16 bg-gray-50/50">
            {/* Stats Hero Section */}
            <section className="bg-white border-b border-gray-100 pb-16">
                <div className="max-w-7xl mx-auto px-4 pt-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                                Performance <span className="text-brand-purple">Overview</span>
                            </h1>
                            <p className="text-gray-500 font-medium">Track your earnings and agency growth in real-time.</p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white border border-purple-100 px-5 py-3 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 bg-purple-50 text-brand-purple rounded-xl flex items-center justify-center">
                                <LuWallet size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Wallet Balance</p>
                                <h3 className="text-xl font-black text-gray-900 leading-none mt-1">
                                    {loading ? <div className="h-5 w-16 bg-gray-100 animate-pulse rounded mt-1" /> : `₹${(stats?.walletBalance || 0).toLocaleString()}`}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setIsRechargeOpen(true)}
                                className="ml-2 p-2 bg-brand-purple text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-purple-100 cursor-pointer"
                                title="Recharge Wallet"
                            >
                                <LuPlus size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {statCards.map((stat, idx) => (
                            <div 
                                key={idx}
                                className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/40 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
                            >
                                {/* Background Decorative element */}
                                <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} opacity-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                                
                                <div className="relative z-10 flex flex-col h-full items-start justify-between space-y-4">
                                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-500`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-2xl font-black text-gray-900 leading-none">
                                            {loading ? <div className="h-6 w-16 bg-gray-100 animate-pulse rounded" /> : (stat.label.includes('Earn') || stat.label.includes('Bal') || stat.label.includes('Top') ? `₹${stat.value.toLocaleString()}` : stat.value)}
                                        </h3>
                                        <p className="text-[9px] font-bold text-gray-400 mt-2 italic">{stat.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Activity Section */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900">Recent Activity</h2>
                        <p className="text-gray-500 text-sm font-medium">Your latest transactions and applications.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    ) : stats?.recentActivities?.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {stats.recentActivities.map((activity, idx) => {
                                const statusColors = activity.status?.toLowerCase() === 'approved' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : activity.status?.toLowerCase() === 'rejected'
                                    ? 'bg-rose-100 text-rose-700'
                                    : 'bg-amber-100 text-amber-700';
                                
                                return (
                                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                                                activity.type === 'Top Up' ? 'bg-purple-50 text-purple-600' : 
                                                activity.type === 'Withdraw' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                                            }`}>
                                                {activity.type === 'Top Up' ? <LuGem /> : 
                                                 activity.type === 'Withdraw' ? <LuTrendingUp /> : <LuStar />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{activity.title}</h4>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-xs text-gray-400 font-medium">{dayjs(activity.date).fromNow()}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${statusColors}`}>
                                                        {activity.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {activity.amount && (
                                                <p className={`font-black text-lg ${activity.type === 'Withdraw' ? 'text-gray-900' : 'text-emerald-600'}`}>
                                                    {activity.type === 'Withdraw' ? '-' : '+'}₹{activity.amount.toLocaleString()}
                                                </p>
                                            )}
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{activity.subType}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <LuActivity size={32} />
                            </div>
                            <h4 className="font-bold text-gray-900">No Recent Activity</h4>
                            <p className="text-gray-500 text-sm mt-1">Activities will appear here once you start using the platform.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900">Explore Services</h2>
                            <p className="text-gray-500 text-sm md:text-base font-medium">Everything you need to grow your talent path.</p>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-brand-purple font-black text-xs uppercase tracking-widest bg-white border border-purple-100 px-4 py-2 rounded-xl shadow-sm">
                            <LuActivity size={14} />
                            <span>High Priority</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                onClick={cat.onClick}
                                className={`group bg-gray-50/50 p-8 rounded-[32px] border border-gray-100/80 hover:bg-white hover:border-brand-purple/40 shadow-sm hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 flex flex-col justify-between cursor-pointer`}
                            >
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                            {React.cloneElement(cat.icon, { size: 32 })}
                                        </div>
                                        {cat.showHistory && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const handled = cat.onHistoryClick ? cat.onHistoryClick() : false;
                                                    if (!handled) {
                                                        navigate(`/history?tab=${cat.historyTab}`);
                                                    }
                                                }}
                                                className="p-3 rounded-2xl bg-white hover:bg-brand-purple hover:text-white text-gray-400 transition-all cursor-pointer shadow-sm border border-gray-100"
                                                title="View History"
                                            >
                                                <LuHistory size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900">{cat.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm font-medium">{cat.desc}</p>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Button
                                        variant={cat.btnVariant === 'secondary' ? 'secondary' : 'primary'}
                                        className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (cat.onClick) {
                                                cat.onClick();
                                            }
                                        }}
                                    >
                                        <span>{cat.action}</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modals */}
            <ApplyForEventModal
                isOpen={isApplyEventOpen}
                onClose={() => setIsApplyEventOpen(false)}
            />
            <ApplyForInfluencerModal
                isOpen={isApplyInfluencerOpen}
                onClose={() => setIsApplyInfluencerOpen(false)}
            />
            <ApplyForAgencyModal
                isOpen={isApplyAgencyOpen}
                onClose={() => setIsApplyAgencyOpen(false)}
            />
            <ApplyForHostingModal
                isOpen={isApplyHostingOpen}
                onClose={() => setIsApplyHostingOpen(false)}
            />
            <TopUpModal 
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
            />
            <RechargeWalletModal 
                isOpen={isRechargeOpen}
                onClose={() => setIsRechargeOpen(false)}
                onRefresh={fetchStats}
            />
            <RechargeStatusModal 
                isOpen={isRechargeStatusOpen}
                onClose={() => setIsRechargeStatusOpen(false)}
                recharge={latestRecharge}
            />
        </div>
    );
};

export default Dashboard;
