import React, { useEffect } from 'react';
import { LuX, LuDownload, LuBadgeCheck, LuGift, LuShare2 } from 'react-icons/lu';
import Button from '../common/Button';

const InviteStatusModal = ({ isOpen, onClose, onClaimReward }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const details = [
        { label: 'ID', value: '585794580' },
        { label: 'Invitor ID', value: '99382973' },
        { label: 'Invite Status', value: 'Accepted', valueClass: 'text-emerald-300' },
        { label: 'Host Status', value: 'Approved (PASS)', valueClass: 'text-emerald-300' },
        { label: 'Host Category', value: 'Audio / Video' },
        { label: 'Remarks', value: 'N/A' }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-[420px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <h3 className="text-lg font-black tracking-tight">Invite Status</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                            <LuBadgeCheck size={16} className="text-emerald-600" />
                            <span className="text-gray-600 text-sm font-bold">Invite Status:</span>
                            <span className="text-emerald-600 font-black uppercase text-sm">Accepted</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">
                        {details.map((item, idx) => (
                            <div key={`${item.label}-${idx}`} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                <div className={`flex items-center font-bold text-sm text-gray-900 text-right ${item.valueClass || ''}`}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-2">
                        <button className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm">
                            <LuDownload size={18} />
                            <span>Invite Ranking</span>
                        </button>

                        <button
                            onClick={() => { onClose(); if (onClaimReward) onClaimReward(); }}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                        >
                            <LuGift className="text-white" size={20} />
                            <span>Claim Your Scratch Card</span>
                        </button>
                    </div>

                    <div className="text-center space-y-2 pt-2">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                            Invite More & Earn More Scratch Cards
                        </p>
                        <Button variant="white" className="w-full rounded-2xl py-3 gap-2">
                            <LuShare2 size={16} />
                            Invite & Earn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteStatusModal;
