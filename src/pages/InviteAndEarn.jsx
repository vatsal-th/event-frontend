import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuGem, LuTrophy, LuUsers, LuShare2, LuLoader, LuCopy, LuCheck } from 'react-icons/lu';
import Button from '../components/common/Button';
import { fetchReferralStats, fetchLeaderboard, fetchReferralHistory } from '../store/slices/referralSlice';

const InviteAndEarn = () => {
    const dispatch = useDispatch();
    const { stats, leaderboard, history, loading } = useSelector((state) => state.referrals);
    const { user } = useSelector((state) => state.auth);
    const [copied, setCopied] = useState(false);
    const [activeView, setActiveView] = useState('leaderboard'); // 'leaderboard' or 'myRanking'

    useEffect(() => {
        dispatch(fetchReferralStats());
        dispatch(fetchLeaderboard(10));
        dispatch(fetchReferralHistory({ page: 1, limit: 5 }));
    }, [dispatch]);

    const copyInviteCode = () => {
        if (stats?.userInviteCode || user?.inviteId) {
            navigator.clipboard.writeText(stats?.userInviteCode || user?.inviteId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Get top 3 rankers
    const topRankers = leaderboard?.slice(0, 3).map((ranker, index) => ({
        rank: index + 1,
        userId: ranker.email,
        fullName: ranker.fullName,
        invites: ranker.totalReferrals,
        reward: ranker.totalPoints,
        color: index === 0 ? "from-amber-300 to-amber-500" :
            index === 1 ? "from-slate-300 to-slate-400" :
                "from-orange-300 to-orange-400",
        shadow: index === 0 ? "shadow-amber-200" :
            index === 1 ? "shadow-slate-200" :
                "shadow-orange-200",
        badge: index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"
    })) || [];

    // Get other rankers (4-10)
    const otherRankers = leaderboard?.slice(3, 10).map((ranker, index) => ({
        rank: index + 4,
        userId: ranker.email,
        fullName: ranker.fullName,
        reward: ranker.totalPoints
    })) || [];

    // Find current user's rank
    const myRank = leaderboard?.findIndex(r => r.email === user?.email) + 1 || 0;
    const myRanking = {
        userId: user?.email || 'N/A',
        fullName: user?.fullName || 'User',
        rank: myRank,
        invites: stats?.totalReferrals || 0,
        reward: stats?.totalPointsEarned || 0,
        category: myRank > 0 ? "Active" : "Not Ranked"
    };

    // Ranking snapshot (top 4 with current user highlighted)
    const rankingSnapshot = leaderboard?.slice(0, 4).map((ranker, index) => ({
        rank: index + 1,
        userId: ranker.email,
        fullName: ranker.fullName,
        invites: ranker.totalReferrals,
        badge: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐",
        isMe: ranker.email === user?.email
    })) || [];

    if (loading && !stats && !leaderboard) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-100 via-purple-50 to-white flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <LuLoader className="animate-spin text-purple-600 mb-4" size={48} />
                    <p className="text-gray-600 font-medium">Loading referral data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-violet-100 via-purple-50 to-white relative overflow-hidden">
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
                            Invite Friends, <span className="text-brand-dark-purple">Earn Rewards</span>
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
                            Share your invite code, grow the community, and climb the leaderboard for amazing rewards.
                        </p>

                        {/* Invite Code Display */}
                        {(stats?.userInviteCode || user?.inviteId) && (
                            <div className="bg-white/70 border border-white rounded-2xl p-4 shadow-sm">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Invite Code</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-3 rounded-xl border-2 border-purple-200">
                                        <span className="font-mono text-xl font-black text-brand-purple">
                                            {stats?.userInviteCode || user?.inviteId}
                                        </span>
                                    </div>
                                    <button
                                        onClick={copyInviteCode}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all ${copied
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                                            }`}
                                    >
                                        {copied ? <><LuCheck size={18} /> Copied!</> : <><LuCopy size={18} /> Copy</>}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                            <div className="bg-white/70 border border-white rounded-[20px] p-4 flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                    <LuUsers size={18} className="text-brand-purple" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Total Inviters</p>
                                    <p className="text-lg font-black text-gray-900">{leaderboard?.length || 0}</p>
                                </div>
                            </div>
                            <div className="bg-white/70 border border-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <LuGem size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Your Invites</p>
                                    <p className="text-lg font-black text-gray-900">{stats?.totalReferrals || 0}</p>
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
                                Your Total Points Earned
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
                                {stats?.totalPointsEarned || 0} <span className="text-xl sm:text-2xl">Points</span>
                            </h2>
                            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
                                Earn more by inviting friends
                            </span>
                        </div>
                    </div>
                </section>

                {/* View Toggle */}
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => setActiveView('leaderboard')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${activeView === 'leaderboard'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                : 'bg-white/70 text-gray-600 border border-white hover:bg-white'
                            }`}
                    >
                        <LuTrophy className="inline mr-2" size={18} />
                        Leaderboard
                    </button>
                    <button
                        onClick={() => setActiveView('myRanking')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${activeView === 'myRanking'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                : 'bg-white/70 text-gray-600 border border-white hover:bg-white'
                            }`}
                    >
                        <LuUsers className="inline mr-2" size={18} />
                        My Ranking
                    </button>
                </div>

                {/* Leaderboard View */}
                {activeView === 'leaderboard' && (
                    <section className="space-y-6">
                        <div className="flex items-end justify-between gap-6">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Leaderboard</h2>
                                <p className="text-gray-500 text-sm sm:text-base">Top inviters of all time</p>
                            </div>
                            <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Live Rankings
                            </span>
                        </div>

                        {/* Top 3 */}
                        {topRankers.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                {topRankers.map((ranker) => (
                                    <div key={ranker.rank} className="bg-white/70 backdrop-blur-md rounded-[20px] border border-white shadow-sm p-5 sm:p-6 relative overflow-hidden">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 text-3xl flex items-center justify-center`}>
                                                {ranker.badge}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-brand-purple uppercase tracking-wider">Rank {ranker.rank}</p>
                                                <p className="text-lg font-black text-gray-900 leading-none truncate">{ranker.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-sm font-bold">
                                            <div className="flex items-center gap-2 text-brand-dark-purple">
                                                <LuGem size={16} className="text-sky-500" />
                                                {ranker.reward} pts
                                            </div>
                                            <span className="text-gray-500">{ranker.invites} Invites</span>
                                        </div>
                                        <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${ranker.color} w-[${Math.min(ranker.invites * 5, 100)}%]`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Other Rankings */}
                        {otherRankers.length > 0 && (
                            <div className="bg-white/50 backdrop-blur-lg rounded-[20px] overflow-hidden border border-white/60 shadow-sm">
                                <div className="px-5 sm:px-6 py-4 border-b border-white/40 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                                    <span>Rank & User</span>
                                    <span>Points</span>
                                </div>
                                {otherRankers.map((ranker) => (
                                    <div key={ranker.rank} className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/20 last:border-0 hover:bg-white/40 transition-colors">
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <span className="font-black text-brand-dark-purple/60 w-6 text-center">{ranker.rank}</span>
                                            <span className="font-bold text-gray-700 text-sm sm:text-base truncate">{ranker.fullName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-brand-dark-purple text-sm sm:text-base">
                                            <LuGem size={14} className="text-sky-500" />
                                            {ranker.reward}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {leaderboard?.length === 0 && (
                            <div className="text-center py-12 bg-white/50 rounded-[20px] border border-white/60">
                                <LuTrophy className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-900 font-bold text-lg mb-2">No Rankings Yet</p>
                                <p className="text-gray-500 text-sm">Be the first to start inviting!</p>
                            </div>
                        )}
                    </section>
                )}

                {/* My Ranking View */}
                {activeView === 'myRanking' && (
                    <section className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">My Ranking</h2>
                                <p className="text-gray-500 text-sm sm:text-base">Your inviter performance</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1.5 rounded-full border text-xs font-bold ${myRanking.category === 'Active'
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                        : 'bg-gray-50 border-gray-200 text-gray-600'
                                    }`}>
                                    {myRanking.category}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-violet-200/40 via-purple-100/40 to-pink-100/40 rounded-[24px] border border-white/60 p-4 sm:p-6 shadow-sm">
                            <div className="bg-white/70 backdrop-blur-md rounded-[20px] border border-white/80 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-5 items-center">
                                <div className="flex items-center justify-center">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-lg border border-white">
                                        <span className="text-4xl sm:text-5xl">
                                            {myRanking.rank === 1 ? '🥇' : myRanking.rank === 2 ? '🥈' : myRanking.rank === 3 ? '🥉' : '⭐'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</span>
                                            <span className="text-sm font-black text-gray-900 truncate ml-2">{myRanking.fullName}</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Rank</span>
                                            <span className="text-sm font-black text-brand-purple">
                                                {myRanking.rank > 0 ? `Rank #${myRanking.rank}` : 'Not Ranked'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Invites</span>
                                            <span className="text-sm font-black text-gray-900">{myRanking.invites}</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 border border-white/70">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Points</span>
                                            <span className="text-sm font-black text-amber-600">{myRanking.reward}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ranking Snapshot */}
                        {rankingSnapshot.length > 0 && (
                            <div className="bg-white/70 backdrop-blur-lg rounded-[20px] border border-white/70 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white/70 border-b border-white/60">
                                    <h3 className="text-sm sm:text-base font-black text-gray-900">Ranking Snapshot</h3>
                                </div>
                                <div className="divide-y divide-white/60">
                                    <div className="grid grid-cols-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 px-5 sm:px-6 py-3">
                                        <span>Rank</span>
                                        <span>User</span>
                                        <span className="text-right">Invites</span>
                                    </div>
                                    {rankingSnapshot.map((item) => (
                                        <div
                                            key={`${item.rank}-${item.userId}`}
                                            className={`grid grid-cols-3 items-center px-5 sm:px-6 py-3 text-sm ${item.isMe ? 'bg-violet-100/60' : 'bg-white/60'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 text-center font-black text-gray-700">{item.rank}</span>
                                                <span className="text-lg">{item.badge}</span>
                                            </div>
                                            <span className="font-bold text-gray-800 truncate">{item.fullName}</span>
                                            <span className="text-right font-black text-gray-800">{item.invites}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Referrals */}
                        {stats?.referralList && stats.referralList.length > 0 && (
                            <div className="bg-white/70 backdrop-blur-lg rounded-[20px] border border-white/70 shadow-sm overflow-hidden">
                                <div className="px-5 sm:px-6 py-4 bg-white/70 border-b border-white/60">
                                    <h3 className="text-sm sm:text-base font-black text-gray-900">Recent Referrals</h3>
                                </div>
                                <div className="divide-y divide-white/60">
                                    {stats.referralList.map((referral, index) => (
                                        <div key={index} className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white/60">
                                            <div>
                                                <p className="font-bold text-gray-900">{referral.userName}</p>
                                                <p className="text-xs text-gray-500">{new Date(referral.date).toLocaleDateString()}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                                +{referral.pointsEarned} pts
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default InviteAndEarn;
