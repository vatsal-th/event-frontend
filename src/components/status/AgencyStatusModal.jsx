import React, { useEffect } from 'react';
import { LuX, LuBadgeCheck, LuGift, LuShare2 } from 'react-icons/lu';
import Button from '../common/Button';

const AgencyStatusModal = ({ isOpen, onClose }) => {
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
        { label: 'Agency ID', value: '585794580' },
        { label: 'Agency Name', value: 'arva agrncy' },
        { label: 'Agent Code', value: '14488' },
        { label: 'Agent Status', value: 'Approved (PASS)' },
        { label: 'Verified Admin Name', value: 'Rajput Entertainment Hub' },
        { label: 'Remarks', value: 'NA' }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-[430px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <h3 className="text-lg font-black tracking-tight">Agency Status</h3>
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
                            <span className="text-gray-600 text-sm font-bold">Agency Status:</span>
                            <span className="text-emerald-600 font-black uppercase text-sm">Approved</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">
                        {details.map((item, idx) => (
                            <div key={`${item.label}-${idx}`} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                <div className="flex items-center font-bold text-sm text-gray-900 text-right">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button className="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-black text-sm hover:bg-gray-50 transition-all shadow-sm">
                            OK
                        </button>
                    </div>

                    <div className="bg-white/80 border border-gray-100 rounded-[16px] p-4 flex items-center gap-3 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                            <LuGift size={20} className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-gray-900 font-black">Claim Your Scratch Card!</p>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                Invite More & Earn More Scratch Cards!
                            </p>
                        </div>
                    </div>

                    <Button variant="white" className="w-full rounded-2xl py-3 gap-2">
                        <LuShare2 size={16} />
                        Invite & Earn
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AgencyStatusModal;
