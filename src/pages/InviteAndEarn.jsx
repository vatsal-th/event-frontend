import React from 'react';
import { LuGem, LuTrophy, LuUsers, LuShare2 } from 'react-icons/lu';
import Button from '../components/common/Button';

const InviteAndEarn = () => {
    const topRankers = [
        { rank: 1, userId: "585794580", invites: 17, reward: 600, color: "from-amber-300 to-amber-500", shadow: "shadow-amber-200", badge: "🥇" },
        { rank: 2, userId: "99382973", invites: 10, reward: 400, color: "from-slate-300 to-slate-400", shadow: "shadow-slate-200", badge: "🥈" },
        { rank: 3, userId: "77283911", invites: 9, reward: 250, color: "from-orange-300 to-orange-400", shadow: "shadow-orange-200", badge: "🥉" },
    ];

    const otherRankers = [
        { rank: 4, userId: "661112990", reward: 295 },
        { rank: 5, userId: "55882910", reward: 220 },
        { rank: 6, userId: "44829177", reward: 205 },
        { rank: 7, userId: "66112990", reward: 195 },
        { rank: 8, userId: "22819011", reward: 165 },
        { rank: 9, userId: "99281002", reward: 120 },
    ];
    const myRanking = {
        userId: "585794580",
        rank: 2,
        invites: 10,
        reward: 400,
        category: "Active"
    };
    const rankingSnapshot = [
        { rank: 1, userId: "77283911", invites: 17, badge: "🥇" },
        { rank: 2, userId: "585794580", invites: 10, badge: "🥈", isMe: true },
        { rank: 3, userId: "585794580", invites: 10, badge: "🥉" },
        { rank: 4, userId: "66112990", invites: 9 }
    ];

    return (
        <div className=" bg-gradient-to-b from-violet-100 via-purple-50 to-white relative overflow-hidden">
            {/* Soft Background Effects */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-40 -right-20 w-80 h-80 bg-fuchsia-200/40 blur-[110px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 relative z-10 space-y-12 md:space-y-16">
                {/* Hero */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white text-[10px] font-black uppercase tracking-widest text-brand-dark-purple">
                            <LuShare2 size={12} />
                            Invite & Earn
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Invite Anchors, <span className="text-brand-dark-purple">Earn Diamonds</span>
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
                            Share your invite link, grow the community, and climb the leaderboard for monthly rewards.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                            <Button variant="primary" className="w-full sm:w-auto shadow-xl shadow-purple-200">
                                Invite Now
                            </Button>
                            <Button variant="white" className="w-full sm:w-auto">
                                View Rules
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                            <div className="bg-white/70 border border-white rounded-[20px] p-4 flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                    <LuUsers size={18} className="text-brand-purple" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Total Inviters</p>
                                    <p className="text-lg font-black text-gray-900">5,482</p>
                                </div>
                            </div>
                            <div className="bg-white/70 border border-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <LuGem size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Your Invites</p>
                                    <p className="text-lg font-black text-gray-900">12</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reward Pool */}
                    <div className="bg-gradient-to-r from-[#a855f7] via-[#9333ea] to-[#7e22ce] rounded-[2rem] p-6 sm:p-8 text-center text-white shadow-2xl shadow-purple-300 relative overflow-hidden border border-white/20">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent)] pointer-events-none"></div>
                        <div className="absolute -right-4 -bottom-4 text-white/10 rotate-12">
                            <LuGem size={140} />
                        </div>
                        <div className="relative z-10 space-y-3">
                            <div className="flex justify-center">
                                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-inner border border-white/30">
                                    <LuGem size={38} className="text-white drop-shadow-md" />
                                </div>
                            </div>
                            <p className="text-white/80 font-bold text-xs sm:text-sm tracking-widest uppercase">
                                Total Monthly Reward Pool
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
                                2,000 <span className="text-xl sm:text-2xl">Diamonds</span>
                            </h2>
                            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
                                Diamonds are distributed among Top 10 Inviters
                            </span>
                        </div>
                    </div>
                </section>

                {/* Leaderboard */}
                <section className="space-y-6">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Leaderboard</h2>
                            <p className="text-gray-500 text-sm sm:text-base">Top inviters this month</p>
                        </div>
                        <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Updated daily
                        </span>
                    </div>

                    {/* Top 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {topRankers.map((ranker) => (
                            <div key={ranker.rank} className="bg-white/70 backdrop-blur-md rounded-[20px] border border-white shadow-sm p-5 sm:p-6 relative overflow-hidden">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 text-3xl flex items-center justify-center`}>
                                        {ranker.badge}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-brand-purple uppercase tracking-wider">Rank {ranker.rank}</p>
                                        <p className="text-lg font-black text-gray-900 leading-none">{ranker.userId}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                                    <div className="flex items-center gap-2 text-brand-dark-purple">
                                        <LuGem size={16} className="text-sky-500" />
                                        {ranker.reward}
                                    </div>
                                    <span className="text-gray-500">{ranker.invites} Invites</span>
                                </div>
                                <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${ranker.color} w-[70%]`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Rankings */}
                    <div className="bg-white/50 backdrop-blur-lg rounded-[20px] overflow-hidden border border-white/60 shadow-sm">
                        <div className="px-5 sm:px-6 py-4 border-b border-white/40 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                            <span>Rank & User</span>
                            <span>Reward</span>
                        </div>
                        {otherRankers.map((ranker) => (
                            <div key={ranker.rank} className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/20 last:border-0 hover:bg-white/40 transition-colors">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <span className="font-black text-brand-dark-purple/60 w-6 text-center">{ranker.rank}</span>
                                    <span className="font-bold text-gray-700 text-sm sm:text-base">{ranker.userId}</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-brand-dark-purple text-sm sm:text-base">
                                    <LuGem size={14} className="text-sky-500" />
                                    {ranker.reward}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* View My Ranking */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">View My Ranking</h2>
                            <p className="text-gray-500 text-sm sm:text-base">Your monthly inviter performance</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-white/70 border border-white text-xs font-bold text-gray-600">
                                January 2025
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-violet-200/40 via-purple-100/40 to-pink-100/40 rounded-[24px] border border-white/60 p-4 sm:p-6 shadow-sm">
                        <div className="bg-white/70 backdrop-blur-md rounded-[20px] border border-white/80 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-5 items-center">
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-lg border border-white">
                                    <span className="text-4xl sm:text-5xl">🥈</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your ID</span>
                                        <span className="text-sm font-black text-gray-900">{myRanking.userId}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Rank</span>
                                        <span className="text-sm font-black text-brand-purple">Rank #{myRanking.rank}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Invites</span>
                                        <span className="text-sm font-black text-gray-900">{myRanking.invites}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Reward</span>
                                        <span className="text-sm font-black text-amber-600">${myRanking.reward}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</span>
                                    <span className="text-sm font-black text-gray-900">{myRanking.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-lg rounded-[20px] border border-white/70 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white/70 border-b border-white/60">
                            <h3 className="text-sm sm:text-base font-black text-gray-900">Ranking Snapshot</h3>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-white/80 border border-white text-[10px] font-bold text-gray-600">
                                    January 2025
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600">
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="divide-y divide-white/60">
                            <div className="grid grid-cols-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 px-5 sm:px-6 py-3">
                                <span>Rank</span>
                                <span>Inviter ID</span>
                                <span className="text-right">Invites</span>
                            </div>
                            {rankingSnapshot.map((item) => (
                                <div
                                    key={`${item.rank}-${item.userId}`}
                                    className={`grid grid-cols-3 items-center px-5 sm:px-6 py-3 text-sm ${item.isMe ? 'bg-violet-100/60' : 'bg-white/60'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 text-center font-black text-gray-700">{item.rank}</span>
                                        <span className="text-lg">{item.badge || '⭐'}</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{item.userId}</span>
                                    <span className="text-right font-black text-gray-800">{item.invites}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 px-1">
                        <Button variant="primary" className="w-full sm:w-auto rounded-2xl py-3.5 sm:py-4 gap-2">
                            <LuShare2 size={18} />
                            Invite More
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto rounded-2xl py-3.5 sm:py-4 gap-2">
                            <LuTrophy size={18} />
                            Back to Ranking
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InviteAndEarn;
