import React, { useState, useEffect } from 'react';
import { LuX, LuDownload, LuFileText, LuCoins, LuLoader, LuSearch, LuCheck, LuUser, LuCalendar, LuHash, LuBuilding } from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
import { searchSalaryByTalentId } from '../../api/salaryApi';
import dayjs from 'dayjs';

const SalaryStatusModal = ({ isOpen, onClose, onClaimReward }) => {
    const [searchId, setSearchId] = useState('');
    const [salaryData, setSalaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Prevent background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset state on close
            setSearchId('');
            setSalaryData(null);
            setError(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const res = await searchSalaryByTalentId(searchId.trim());
            console.log("Salary Data:", res);
             if (res.success && res.data) {
                setSalaryData(res.data);
            } else {
                 setError(res.message || "No salary record found for this Talent ID.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to fetch salary details. Please check the ID.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const details = salaryData ? [
        { label: 'Talent ID', value: salaryData.targetUserId, icon: <LuHash size={14} className="mr-1 text-gray-400" /> },
        { label: 'Nickname', value: salaryData.targetUserName || 'N/A', icon: <LuUser size={14} className="mr-1 text-indigo-500" /> },
        { label: 'Payment Date', value: dayjs(salaryData.createdAt).format('MMMM D, YYYY'), icon: <LuCalendar size={14} className="mr-1 text-gray-400" /> },
        { label: 'Amount Paid', value: `₹${salaryData.amount}`, valueColor: 'text-emerald-600', icon: <LuCoins size={14} className="mr-1 text-emerald-500" /> },
        { label: 'Reference No', value: salaryData.transactionId?.substring(0, 8).toUpperCase() || 'N/A' },
        { label: 'Agent Code', value: salaryData.agentCode || 'N/A' }
    ] : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-[420px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(109,40,217,0.2)] border border-purple-100 animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center">
                            <LuFileText size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">RAJPUT ENTERTAINMENT HUB</p>
                            <h3 className="text-lg font-black tracking-tight">Salary Status</h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                    >
                        <LuX size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                    
                    {!salaryData ? (
                        /* Search View */
                        <div className="flex flex-col space-y-6">
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 mb-4">
                                    <LuCoins size={32} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900">Check Salary Status</h3>
                                <p className="text-sm text-gray-500 font-medium">Enter your Talent ID to view your latest salary details securely.</p>
                            </div>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="talentId" className="text-xs font-black text-gray-700 uppercase tracking-wider ml-1">Talent ID</label>
                                    <div className="relative">
                                        <input
                                            id="talentId"
                                            type="text"
                                            value={searchId}
                                            onChange={(e) => setSearchId(e.target.value)}
                                            placeholder="e.g. 6.44E+08"
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3.5 pl-4 font-bold placeholder-gray-400 focus:bg-white transition-all outline-none"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-2 text-rose-600">
                                        <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
                                        <p className="text-xs font-bold leading-relaxed">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!searchId.trim() || loading}
                                    className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-emerald-100 ${
                                        !searchId.trim() || loading 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                                        : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]'
                                    }`}
                                >
                                    {loading ? <LuLoader className="animate-spin" size={18} /> : <LuSearch size={18} />}
                                    <span>{loading ? 'Searching...' : 'Search Salary'}</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* Result View */
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-center">
                                <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                                        <LuCheck size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-gray-600 text-sm font-bold tracking-tight">Status: <span className="text-emerald-600 font-black ml-1 uppercase">Paid</span></span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">
                                {details.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                        <div className={`flex items-center font-bold text-sm ${item.valueColor || 'text-gray-900'} text-right`}>
                                            {item.icon}
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-2">
                                <button className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm">
                                    <LuDownload size={18} />
                                    <span>Download Slip</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        setSalaryData(null);
                                        setSearchId('');
                                    }}
                                    className="w-full cursor-pointer py-3 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors"
                                >
                                    Search Another ID
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalaryStatusModal;
