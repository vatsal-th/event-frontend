import React from 'react';
import { 
    LuWallet, LuUser, LuHash, 
    LuCoins, LuShieldCheck, LuClock, 
    LuCircleCheck, LuCircleX, LuImage,
    LuCalendar
} from 'react-icons/lu';
import { ModernModalLayout } from '../common/ModernModal';

const RechargeStatusModal = ({ isOpen, onClose, recharge }) => {
    if (!recharge) return null;

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { 
                    color: 'text-emerald-600', 
                    bg: 'bg-emerald-50', 
                    border: 'border-emerald-100',
                    icon: LuCircleCheck,
                    label: 'Approved'
                };
            case 'rejected':
                return { 
                    color: 'text-rose-600', 
                    bg: 'bg-rose-50', 
                    border: 'border-rose-100',
                    icon: LuCircleX,
                    label: 'Rejected'
                };
            case 'pending':
            default:
                return { 
                    color: 'text-amber-600', 
                    bg: 'bg-amber-50', 
                    border: 'border-amber-100',
                    icon: LuClock,
                    label: 'Pending Approval'
                };
        }
    };

    const status = getStatusConfig(recharge.status);
    const StatusIcon = status.icon;

    const DetailItem = ({ icon: Icon, label, value, color = "text-gray-900" }) => (
        <div className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 rounded-xl transition-colors">
            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors">
                    <Icon size={18} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                    <p className={`text-sm font-bold ${color} leading-none`}>{value || 'N/A'}</p>
                </div>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Recharge Details"
            HeaderIcon={LuWallet}
        >
            <div className="space-y-6 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar pb-4">
                {/* Status Hero */}
                <div className={`${status.bg} ${status.border} border rounded-[32px] p-8 flex flex-col items-center text-center relative overflow-hidden group`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                        <StatusIcon size={120} />
                    </div>
                    
                    <div className={`w-20 h-20 rounded-[24px] ${status.bg} border-4 border-white shadow-xl flex items-center justify-center ${status.color} mb-4 relative z-10`}>
                        <StatusIcon size={36} />
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className={`text-2xl font-black ${status.color} mb-1`}>{status.label}</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Transaction Status</p>
                    </div>

                    {recharge.remark && (
                        <div className="mt-4 p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 text-[11px] font-medium text-gray-600 max-w-xs">
                            <span className="font-black text-gray-400 uppercase mr-1">Admin Remark:</span>
                            {recharge.remark}
                        </div>
                    )}
                </div>

                {/* Info Grid */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-2 space-y-1 shadow-sm">
                    <DetailItem icon={LuUser} label="Agent Name" value={recharge.agentName} />
                    <DetailItem icon={LuHash} label="Agent ID" value={recharge.agentId} />
                    <DetailItem icon={LuWallet} label="Method" value={recharge.rechargeType} color="text-brand-purple" />
                    <DetailItem icon={LuCoins} label="Amount" value={`₹${recharge.amount?.toLocaleString()}`} color="text-emerald-600" />
                    <DetailItem icon={LuShieldCheck} label="UTR Number" value={recharge.utrNumber} color="text-blue-600" />
                    <DetailItem icon={LuCalendar} label="Submitted On" value={formatDate(recharge.createdAt)} />
                </div>

                {/* Payment Proof Section */}
                {recharge.paymentProof && (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 px-2">
                            <LuImage className="text-brand-purple" size={16} />
                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Payment Proof</h4>
                        </div>
                        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-gray-50 group/img bg-gray-50">
                            <img 
                                src={recharge.paymentProof} 
                                alt="Payment Proof" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                            />
                            <a 
                                href={recharge.paymentProof} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                            >
                                <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest">
                                    View Full Image
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </ModernModalLayout>
    );
};

export default RechargeStatusModal;
