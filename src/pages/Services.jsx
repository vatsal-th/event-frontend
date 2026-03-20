import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LuMic, LuStar, LuUsers, LuWallet, LuShare2, LuGift, 
    LuHistory, LuActivity, LuPlus, LuChevronRight
} from 'react-icons/lu';
import Button from '../components/common/Button';
import ApplyForEventModal from '../components/status/ApplyForEventModal';
import ApplyForInfluencerModal from '../components/status/ApplyForInfluencerModal';
import ApplyForAgencyModal from '../components/status/ApplyForAgencyModal';
import ApplyForHostingModal from '../components/status/ApplyForHostingModal';
import TopUpModal from '../components/status/TopUpModal';
import RechargeWalletModal from '../components/status/RechargeWalletModal';
import RechargeStatusModal from '../components/status/RechargeStatusModal';
import { getMyRechargeHistory } from '../api/rechargeApi';

const Services = () => {
    const navigate = useNavigate();
    const [isApplyEventOpen, setIsApplyEventOpen] = useState(false);
    const [isApplyInfluencerOpen, setIsApplyInfluencerOpen] = useState(false);
    const [isApplyAgencyOpen, setIsApplyAgencyOpen] = useState(false);
    const [isApplyHostingOpen, setIsApplyHostingOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isRechargeOpen, setIsRechargeOpen] = useState(false);
    const [isRechargeStatusOpen, setIsRechargeStatusOpen] = useState(false);
    const [latestRecharge, setLatestRecharge] = useState(null);

    useEffect(() => {
        fetchLatestRecharge();
    }, []);

    const fetchLatestRecharge = async () => {
        try {
            const rechargeRes = await getMyRechargeHistory();
            if (rechargeRes.success && rechargeRes.data?.length > 0) {
                setLatestRecharge(rechargeRes.data[0]);
            }
        } catch (err) {
            console.error("Error fetching recharge history:", err);
        }
    };

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
                    return true;
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
        <div className="max-w-7xl mx-auto px-4 py-20">
            {/* Header */}
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

            {/* Grid */}
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
                onRefresh={fetchLatestRecharge}
            />
            <RechargeStatusModal 
                isOpen={isRechargeStatusOpen}
                onClose={() => setIsRechargeStatusOpen(false)}
                recharge={latestRecharge}
            />
        </div>
    );
};

export default Services;
