import React, { useState, useEffect } from 'react';
import { LuCalendar, LuWallet, LuCoins, LuMic, LuUsers, LuGift, LuArrowRight, LuCircleCheck, LuClock, LuStar, LuHistory, LuX, LuInfo, LuPlus } from 'react-icons/lu';
import Button from '../components/common/Button';
import ScratchCardModal from '../components/rewards/ScratchCardModal';
import RewardHistoryModal from '../components/rewards/RewardHistoryModal';
import TopUpStatusModal from '../components/status/TopUpStatusModal';
import SalaryStatusModal from '../components/status/SalaryStatusModal';
import InviteStatusModal from '../components/status/InviteStatusModal';
import BillingStatusModal from '../components/status/BillingStatusModal';
import InfluencerStatusModal from '../components/status/InfluencerStatusModal';
import HostingStatusModal from '../components/status/HostingStatusModal';
import AgencyStatusModal from '../components/status/AgencyStatusModal';
import EventStatusModal from '../components/status/EventStatusModal';
import TopUpModal from '../components/status/TopUpModal';
import { getLatestStatus, markAsScratched } from '../api/userHistoryApi';

const Services = () => {
    const [activeTab, setActiveTab] = useState('billing');
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
    const [isInfluencerModalOpen, setIsInfluencerModalOpen] = useState(false);
    const [isHostingModalOpen, setIsHostingModalOpen] = useState(false);
    const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isTopUpCreateOpen, setIsTopUpCreateOpen] = useState(false);
    const [activeScratchData, setActiveScratchData] = useState(null);

    const [applications, setApplications] = useState({
        hosting: null,
        events: null,
        agency: null,
        influencer: null
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getLatestStatus();
            if (response.success) {
                const data = response.data;
                setApplications({
                    hosting: data.hosting || null,
                    events: data.events || null,
                    agency: data.agency || null,
                    influencer: data.influencer || null
                });
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleClaimReward = (id, type, amount) => {
        setActiveScratchData({ id, type, amount });
        setIsRewardModalOpen(true);
        // Close all status modals to prevent stacking
        setIsEventModalOpen(false);
        setIsHostingModalOpen(false);
        setIsAgencyModalOpen(false);
        setIsInfluencerModalOpen(false);
        setIsTopUpModalOpen(false);
        setIsSalaryModalOpen(false);
        setIsInviteModalOpen(false);
        setIsBillingModalOpen(false);
    };

    const handleScratchComplete = async () => {
        if (!activeScratchData) return;

        try {
            await markAsScratched(activeScratchData.type, activeScratchData.id);
            // Refetch data to update the UI (hide scratch card banner in modals)
            await fetchApplications();
            setIsRewardModalOpen(false);
            setActiveScratchData(null);
        } catch (error) {
            console.error('Error marking as scratched:', error);
            // Even if API fails, close modal to avoid stuck state
            setIsRewardModalOpen(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusType = (status) => {
        if (!status) return 'awaiting';
        const s = status.toLowerCase();
        if (s.includes('approve') || s.includes('pass') || s.includes('complete')) return 'approved';
        if (s.includes('reject')) return 'rejected';
        return 'awaiting';
    };

    const statusCards = [
        {
            title: 'Event Status',
            desc: applications.events
                ? `${applications.events.fullName || 'Application'} - ${applications.events.status}`
                : 'Awaiting admin approval...',
            update: applications.events ? formatDate(applications.events.createdAt) : 'April 17, 2024',
            status: applications.events?.status || 'Awaiting Approval',
            statusType: getStatusType(applications.events?.status),
            icon: <LuCalendar size={32} className="text-orange-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsEventModalOpen(true)
        },
        {
            title: 'Top Up Status',
            desc: 'Your top-up has been approved.',
            update: 'April 16, 2024',
            status: 'Approved',
            statusType: 'approved',
            icon: <LuWallet size={32} className="text-blue-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsTopUpModalOpen(true)
        },
        {
            title: 'Salary Status',
            desc: 'Salary has been credited to wallet.',
            update: 'April 15, 2024',
            status: 'Completed',
            statusType: 'completed',
            icon: <LuCoins size={32} className="text-emerald-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsSalaryModalOpen(true)
        },
        {
            title: 'Hosting Status',
            desc: applications.hosting
                ? `${applications.hosting.fullName || 'Application'} - ${applications.hosting.status}`
                : 'Last updated: April 14, 2024',
            update: applications.hosting ? formatDate(applications.hosting.createdAt) : 'April 14, 2024',
            status: applications.hosting?.status || 'Awaiting Approval',
            statusType: getStatusType(applications.hosting?.status),
            icon: <LuMic size={32} className="text-indigo-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsHostingModalOpen(true)
        },
        {
            title: 'Agency Status',
            desc: applications.agency
                ? `${applications.agency.fullName || 'Application'} - ${applications.agency.status}`
                : 'Last updated: April 12, 2024',
            update: applications.agency ? formatDate(applications.agency.createdAt) : 'April 12, 2024',
            status: applications.agency?.status || 'Awaiting Approval',
            statusType: getStatusType(applications.agency?.status),
            icon: <LuUsers size={32} className="text-purple-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsAgencyModalOpen(true)
        },
        {
            title: 'Influencers Status',
            desc: applications.influencer
                ? `${applications.influencer.fullName || 'Application'} - ${applications.influencer.status}`
                : 'Share your talent & earn rewards!',
            update: applications.influencer ? formatDate(applications.influencer.createdAt) : 'April 12, 2024',
            status: applications.influencer?.status || 'Awaiting Approval',
            statusType: getStatusType(applications.influencer?.status),
            icon: <LuStar size={32} className="text-pink-500" />,
            bgColor: 'bg-white',
            onClick: () => setIsInfluencerModalOpen(true)
        },
        {
            title: 'Scratch Card History',
            desc: 'View your previous rewards',
            update: '',
            status: 'View All',
            statusType: 'action',
            icon: <LuGift size={32} className="text-amber-500" />,
            bgColor: 'bg-white'
        },
    ];

    const getStatusStyle = (type) => {
        switch (type) {
            case 'awaiting': return 'bg-[#e3ecff] text-[#2866eb] border-[#c3d6ff]';
            case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'completed': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-200';
            case 'action': return 'bg-indigo-500 text-white border-indigo-500';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusIcon = (type) => {
        switch (type) {
            case 'awaiting': return <LuClock size={14} className="mr-1" />;
            case 'approved': return <LuCircleCheck size={14} className="mr-1" />;
            case 'completed': return <LuCircleCheck size={14} className="mr-1" />;
            case 'rejected': return <LuX size={14} className="mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-16 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">My Services</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">Track the status of your services and earn scratch card rewards!</p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {statusCards.map((card, idx) => (
                    <div
                        key={idx}
                        onClick={card.onClick}
                        className={`group relative bg-[#F4F6F8] rounded-[20px] p-6 border border-gray-100 hover:shadow-md hover:border-brand-purple/20 transition-all duration-500 ${card.onClick ? 'cursor-pointer' : 'cursor-pointer'}`}
                    >
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
                                    <Button
                                        variant="primary"
                                        className="w-full w-fit py-2 text-xs font-bold uppercase tracking-wider rounded-xl"
                                        onClick={() => setIsHistoryModalOpen(true)}
                                    >
                                        {card.status}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {card.update && (
                                        <div className="pt-4 border-t border-[#EAECEF] flex items-center justify-between text-[13px] text-gray-400 font-bold">
                                            <span>Last updated: {card.update}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <ScratchCardModal
                isOpen={isRewardModalOpen}
                onClose={() => setIsRewardModalOpen(false)}
                rewardAmount={activeScratchData?.amount}
                onComplete={handleScratchComplete}
            />

            <RewardHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
            />

            <TopUpStatusModal
                isOpen={isTopUpModalOpen}
                onClose={() => setIsTopUpModalOpen(false)}
                onClaimReward={(id, amount) => handleClaimReward(id, 'topup', amount)}
            />

            <SalaryStatusModal
                isOpen={isSalaryModalOpen}
                onClose={() => setIsSalaryModalOpen(false)}
                onClaimReward={() => setIsRewardModalOpen(true)}
            />

            <InviteStatusModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onClaimReward={(id, amount) => handleClaimReward(id, 'invite', amount)}
            />

            <BillingStatusModal
                isOpen={isBillingModalOpen}
                onClose={() => setIsBillingModalOpen(false)}
            />

            <InfluencerStatusModal
                isOpen={isInfluencerModalOpen}
                onClose={() => setIsInfluencerModalOpen(false)}
                onClaimReward={handleClaimReward}
            />

            <HostingStatusModal
                isOpen={isHostingModalOpen}
                onClose={() => setIsHostingModalOpen(false)}
                onClaimReward={handleClaimReward}
            />

            <AgencyStatusModal
                isOpen={isAgencyModalOpen}
                onClose={() => setIsAgencyModalOpen(false)}
                onClaimReward={handleClaimReward}
            />

            <EventStatusModal
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                onClaimReward={handleClaimReward}
            />

            <TopUpModal 
                isOpen={isTopUpCreateOpen}
                onClose={() => setIsTopUpCreateOpen(false)}
                onRefresh={fetchApplications}
            />
        </div>
    );
};

export default Services;
