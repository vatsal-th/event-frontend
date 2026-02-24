import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LuWallet, LuArrowLeft, LuSearch, LuChevronDown, 
    LuCheck, LuClock, LuInfo, LuArrowRight,
    LuLoader, LuShield, LuCalendar, LuUser,
    LuSend, LuHistory, LuPlus, LuLock, LuEye, LuEyeOff
} from 'react-icons/lu';
import { getDropdowns } from '../api/dropdownApi';
import { getWalletSummary, getWalletPasswordStatus } from '../api/walletApi';
import { createTopUpRequest } from '../api/topupApi';
import { getUserHistory, getLatestStatus } from '../api/userHistoryApi';
import { Select } from '../components/common/Forms';
import { ModernModalLayout, ModernFormSection, ModernInputContainer, ModernInput } from '../components/common/ModernModal';

const TopUpUser = () => {
    const navigate = useNavigate();
    
    // Core Data State
    const [apps, setApps] = useState([]);
    const [walletInfo, setWalletInfo] = useState({ balance: 0 });
    const [hasWalletPin, setHasWalletPin] = useState(false);
    const [history, setHistory] = useState([]);
    const [latestRequest, setLatestRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        appId: '',
        targetUserId: '',
        confirmUserId: '',
        targetUserName: '',
        amount: '',
        confirmAmount: '',
        agentCode: '',
        walletType: 'Main Wallet',
        utrNumber: '',
        paymentProof: null
    });

    // Modal State
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [walletPassword, setWalletPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        initPage();
    }, []);

    const initPage = async () => {
        try {
            setLoading(true);
            const [dropdownRes, walletRes, pinRes, historyRes, latestRes] = await Promise.all([
                getDropdowns(),
                getWalletSummary(),
                getWalletPasswordStatus(),
                getUserHistory(),
                getLatestStatus()
            ]);

            if (dropdownRes.success) setApps(dropdownRes.data.apps || []);
            if (walletRes.success) setWalletInfo(walletRes.data);
            if (pinRes.success) setHasWalletPin(pinRes.hasWalletPassword);
            if (historyRes.success) setHistory(historyRes.data.topups || []);
            if (latestRes.success) setLatestRequest(latestRes.data.topup || null);

        } catch (err) {
            console.error("Initialization error:", err);
            setMessage({ type: 'error', text: "Failed to load page data" });
            setTimeout(() => setMessage(null), 5000);
        } finally {
            setLoading(false);
        }
    };

    // Countdown Timer logic
    useEffect(() => {
        let timer;
        if (isPreviewOpen && countdown > 0) {
            timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isPreviewOpen, countdown]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePreview = (e) => {
        e.preventDefault();
        
        // Validations
        if (!formData.appId) return showToast("error", "Please select an app");
        if (formData.targetUserId !== formData.confirmUserId) return showToast("error", "User IDs do not match");
        if (parseFloat(formData.amount) !== parseFloat(formData.confirmAmount)) return showToast("error", "Amounts do not match");
        if (parseFloat(formData.amount) > walletInfo.balance) return showToast("error", "Insufficient wallet balance");
        if (!hasWalletPin) return showToast("error", "Please set a Transaction PIN in Profile first");

        setCountdown(10);
        setIsPreviewOpen(true);
    };

    const showToast = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!walletPassword) return showToast("error", "Please enter your Wallet Password");
        if (formData.walletType === 'Cash' && !formData.paymentProof) return showToast("error", "Please upload Payment Proof photo");

        try {
            setIsSubmitting(true);
            
            const data = new FormData();
            data.append('appId', formData.appId);
            data.append('targetUserId', formData.targetUserId);
            data.append('targetUserName', formData.targetUserName);
            data.append('amount', parseFloat(formData.amount));
            data.append('walletType', formData.walletType);
            data.append('paymentMethod', formData.walletType);
            data.append('agentCode', formData.agentCode);
            data.append('walletPassword', walletPassword);
            data.append('utrNumber', formData.utrNumber);
            
            if (formData.paymentProof) {
                data.append('paymentProof', formData.paymentProof);
            }

            const res = await createTopUpRequest(data);
            if (res.success) {
                showToast("success", "Top-up request submitted successfully!");
                setIsPreviewOpen(false);
                setFormData({
                    appId: '', targetUserId: '', confirmUserId: '', 
                    targetUserName: '', amount: '', confirmAmount: '', 
                    agentCode: '', walletType: 'Main Wallet', utrNumber: '', paymentProof: null
                });
                setWalletPassword('');
                initPage(); // Refresh data
            } else {
                showToast("error", res.message || "Failed to submit request");
            }
        } catch (err) {
            showToast("error", err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-gray-50 text-gray-500 border-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-100 border-t-brand-purple rounded-full animate-spin"></div>
                    <LuLoader size={24} className="absolute inset-0 m-auto text-brand-purple animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer">
                            <LuArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Top-Up Recharge</h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Agent Recharge Portal</p>
                        </div>
                    </div>
                    <div className="bg-brand-purple/5 px-4 py-2 rounded-2xl border border-brand-purple/10 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-purple rounded-xl flex items-center justify-center text-white">
                            <LuWallet size={16} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Wallet Balance</p>
                            <p className="text-sm font-black text-brand-purple leading-tight">₹{walletInfo.balance.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {message && (
                <div className={`fixed top-24 right-4 z-[100] p-4 rounded-2xl shadow-2xl border flex items-center space-x-3 animate-in slide-in-from-right duration-500 ${
                    message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                    {message.type === 'success' ? <LuCheck size={20} /> : <LuInfo size={20} />}
                    <p className="text-sm font-bold">{message.text}</p>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Recharge Form */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Summary Box */}
                        {latestRequest && (
                            <div className={`p-6 rounded-[32px] border flex items-center justify-between ${getStatusStyle(latestRequest.status)}`}>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        {latestRequest.status === 'Pending' ? <LuClock size={24} /> : latestRequest.status === 'Approved' ? <LuCheck size={24} /> : <LuInfo size={24} />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Latest Request Status</p>
                                        <p className="text-lg font-black">{latestRequest.targetUserName} - ₹{latestRequest.amount}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">{latestRequest.status}</p>
                                    <p className="text-xs font-bold opacity-60">{formatDate(latestRequest.createdAt)}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-10">
                            <div className="flex items-center space-x-4 mb-10">
                                <div className="w-14 h-14 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
                                    <LuPlus size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Recharge</h2>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Fill in the user details carefully</p>
                                </div>
                            </div>

                            <form onSubmit={handlePreview} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2">
                                        <Select 
                                            label="Select App"
                                            value={formData.appId}
                                            onChange={(val) => setFormData({...formData, appId: val})}
                                            options={apps.map(app => ({ value: app._id, label: app.appName }))}
                                            placeholder="Choose an application"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Select 
                                            label="Wallet Type"
                                            value={formData.walletType}
                                            onChange={(val) => setFormData({...formData, walletType: val})}
                                            options={[
                                                { value: 'Main Wallet', label: 'Main Wallet' },
                                                { value: 'Cash', label: 'Cash' }
                                            ]}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Target User ID</label>
                                        <div className="relative group">
                                            <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="targetUserId"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="Enter User ID"
                                                required
                                                value={formData.targetUserId}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Confirm User ID</label>
                                        <div className="relative group">
                                            <LuShield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="confirmUserId"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="Enter User ID again"
                                                required
                                                value={formData.confirmUserId}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">User Name</label>
                                        <div className="relative group">
                                            <LuInfo className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="targetUserName"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="Enter user's profile name"
                                                required
                                                value={formData.targetUserName}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Amount</label>
                                        <div className="relative group">
                                            <LuWallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="amount"
                                                type="number"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="₹0.00"
                                                required
                                                value={formData.amount}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Enter Again Amount</label>
                                        <div className="relative group">
                                            <LuInfo className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="confirmAmount"
                                                type="number"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="Re-enter amount"
                                                required
                                                value={formData.confirmAmount}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    <div className={`md:col-span-${formData.walletType === 'Cash' ? '1' : '2'}`}>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Agent Code</label>
                                        <div className="relative group">
                                            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                            <input 
                                                name="agentCode"
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                placeholder="Enter your Agent Code"
                                                required
                                                value={formData.agentCode}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                    </div>

                                    {formData.walletType === 'Cash' && (
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">UTR / Ref No</label>
                                            <div className="relative group">
                                                <LuInfo className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-purple transition-colors" size={18} />
                                                <input 
                                                    name="utrNumber"
                                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-purple-200 focus:bg-white transition-all shadow-sm"
                                                    placeholder="Enter UTR/ID"
                                                    required
                                                    value={formData.utrNumber}
                                                    onChange={handleFormChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-brand-purple text-white rounded-[24px] font-black text-base uppercase tracking-widest shadow-2xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 cursor-pointer"
                                >
                                    <LuSend size={20} />
                                    <span>Preview Recharge</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: History Table */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Recharge History</h3>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Recent 10 Transactions</p>
                                </div>
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                    <LuHistory size={20} />
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User & App</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Amount</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {history.length > 0 ? history.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-[13px] font-black text-gray-900">{item.targetUserName}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.appId?.name || 'App'}</p>
                                                </td>
                                                <td className="px-6 py-4 font-black text-gray-900 text-center">₹{item.amount}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-12 text-center text-gray-400 font-bold italic">No history found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Confirmation Modal */}
            <ModernModalLayout
                isOpen={isPreviewOpen}
                onClose={() => !isSubmitting && setIsPreviewOpen(false)}
                title="Confirm Recharge"
                HeaderIcon={LuCheck}
            >
                <div className="space-y-6">
                    {/* Countdown Timer */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 border-4 border-amber-100 rounded-full flex items-center justify-center mb-2">
                             <div className="absolute inset-0 border-4 border-amber-500 rounded-full animate-progress-dash" style={{'--dash': countdown}}></div>
                             <span className="text-xl font-black text-amber-600">{String(countdown).padStart(2, '0')}</span>
                        </div>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Confirm within minutes</p>
                    </div>

                    <ModernFormSection title="Summary">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm py-1">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">User Name</span>
                                <span className="text-gray-900 font-black">{formData.targetUserName}</span>
                            </div>
                            <div className="flex justify-between text-sm py-1">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">User ID</span>
                                <span className="text-gray-900 font-black">{formData.targetUserId}</span>
                            </div>
                            <div className="flex justify-between text-sm py-1">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">App Name</span>
                                <span className="text-gray-900 font-black">{apps.find(a => a._id === formData.appId)?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm py-1">
                                <span className="text-gray-400 font-bold uppercase text-[10px]">Method</span>
                                <span className="text-gray-900 font-black">{formData.walletType}</span>
                            </div>
                            <div className="flex justify-between text-lg py-3 border-t border-dashed border-gray-100">
                                <span className="text-gray-400 font-black uppercase text-[11px]">Total Amount</span>
                                <span className="text-brand-purple font-black">₹{formData.amount}</span>
                            </div>
                        </div>
                    </ModernFormSection>

                    {formData.walletType === 'Cash' && (
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Payment Proof (Screenshot)</label>
                            <div className="relative group/upload">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => e.target.files && e.target.files[0] && setFormData({...formData, paymentProof: e.target.files[0]})}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className={`w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                                    formData.paymentProof ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50 group-hover/upload:border-brand-purple/50'
                                }`}>
                                    {formData.paymentProof ? (
                                        <>
                                            <LuCheck className="text-emerald-500 mb-1" size={20} />
                                            <p className="text-[10px] font-black text-emerald-700 uppercase">{formData.paymentProof.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <LuPlus className="text-gray-400 mb-1" size={20} />
                                            <p className="text-[10px] font-black text-gray-500 uppercase">Upload Proof</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ModernInputContainer label="Enter Wallet Password" required>
                            <div className="relative">
                                <ModernInput 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your transaction PIN"
                                    required
                                    value={walletPassword}
                                    onChange={(e) => setWalletPassword(e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-purple transition-colors cursor-pointer"
                                >
                                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                        </ModernInputContainer>

                        <button 
                            type="submit"
                            disabled={isSubmitting || countdown === 0}
                            className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-3 cursor-pointer
                                ${countdown > 0 ? 'bg-black text-white shadow-xl hover:bg-gray-900 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                                ${isSubmitting && 'opacity-70'}
                            `}
                        >
                            {isSubmitting ? <LuLoader className="animate-spin" /> : <LuSend size={18} />}
                            <span>{isSubmitting ? 'Requesting...' : 'Submit Recharge'}</span>
                        </button>
                    </form>
                </div>
            </ModernModalLayout>
        </div>
    );
};

export default TopUpUser;
