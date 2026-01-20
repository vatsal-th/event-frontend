import React, { useEffect } from 'react';
import { LuX, LuDownload, LuCalendarCheck, LuWalletCards } from 'react-icons/lu';
import Button from '../common/Button';

const BillingStatusModal = ({ isOpen, onClose }) => {
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

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-[420px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <h3 className="text-lg font-black tracking-tight">Billing Status</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-500">User ID</label>
                        <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-bold shadow-sm">
                            10203040
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-500">Gifting ID</label>
                        <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-bold shadow-sm">
                            585794580
                        </div>
                    </div>

                    <div className="bg-white rounded-[16px] border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <LuCalendarCheck size={20} className="text-emerald-600" />
                            </div>
                            <p className="text-gray-900 font-black">Gifting Status</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase">
                            Approved
                        </span>
                    </div>

                    <div className="bg-white rounded-[16px] border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                                <LuWalletCards size={20} className="text-rose-500" />
                            </div>
                            <p className="text-gray-900 font-black">Payment Status</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-black uppercase">
                            Pending
                        </span>
                    </div>

                    <Button variant="white" className="w-full rounded-2xl py-3 gap-2">
                        <LuDownload size={18} />
                        Download Payment Slip
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BillingStatusModal;
