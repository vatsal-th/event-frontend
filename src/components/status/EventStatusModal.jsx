import React, { useEffect } from 'react';
import { LuX, LuCalendar, LuClock, LuBadgeCheck, LuDownload, LuGift } from 'react-icons/lu';

const EventStatusModal = ({ isOpen, onClose }) => {
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

            <div className="relative w-full max-w-[430px] bg-gradient-to-b from-[#7b4bd1] via-[#7a46c8] to-[#6a3ec0] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(91,33,182,0.5)] border border-white/20 animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)] pointer-events-none" />

                <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 text-white border-b border-white/10">
                    <h3 className="text-lg font-black tracking-tight">Event Status</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                <div className="relative p-5 sm:p-6 space-y-4">
                    <p className="text-white/80 text-xs font-bold">
                        Anchor ID: <span className="text-white font-black">#585794580</span>
                    </p>

                    <div className="bg-white/10 rounded-[16px] border border-white/15 overflow-hidden">
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10">
                            <span className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-wider">
                                <LuCalendar size={14} /> Event Date
                            </span>
                            <span className="text-white font-bold text-sm">10/12/2025</span>
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10">
                            <span className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-wider">
                                <LuClock size={14} /> Event Time
                            </span>
                            <span className="text-white font-bold text-sm">08:30 AM</span>
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10">
                            <span className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-wider">
                                <LuBadgeCheck size={14} /> Event Status
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-400/90 text-white text-xs font-black uppercase">
                                Approved
                            </span>
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                            <span className="text-white/70 text-[11px] font-bold uppercase tracking-wider">Your Event Goals</span>
                            <span className="text-white font-black text-sm">20 Lacs</span>
                        </div>
                    </div>

                    <div className="bg-white/10 border border-white/15 rounded-[16px] p-3">
                        <div className="w-full aspect-[2.2/1] rounded-[12px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 border border-white/20 flex items-center justify-center text-white font-black text-sm">
                            UPCOMING EVENT BANNER
                        </div>
                    </div>

                    <div className="space-y-3 pt-1">
                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-[#5b21b6] font-black text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer">
                            <LuGift className="text-[#5b21b6]" size={18} />
                            <span>Claim Your Scratch Card</span>
                        </button>
                        <button className="w-full py-3 rounded-xl border border-white/20 text-white bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm">
                            <LuDownload size={18} />
                            <span>Download Banner</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventStatusModal;
