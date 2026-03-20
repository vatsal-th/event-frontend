import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import { 
    LuUsers, LuMic, LuStar, LuWallet, LuTrendingUp, 
    LuUserCheck, LuShield, LuActivity, LuGem, LuPlus
} from 'react-icons/lu';
import { getDashboardStats } from '../api/dashboardApi';
import Button from '../components/common/Button';
import RechargeWalletModal from '../components/status/RechargeWalletModal';
import { getMyRechargeHistory } from '../api/rechargeApi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRechargeOpen, setIsRechargeOpen] = useState(false);

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
            <section className="max-w-7xl mx-auto px-4 pb-20">
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


            {/* Modals */}
            <RechargeWalletModal 
                isOpen={isRechargeOpen}
                onClose={() => setIsRechargeOpen(false)}
                onRefresh={fetchStats}
            />
        </div>
    );
};

export default Dashboard;
