import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    LuWallet, LuCheck, LuInfo, 
    LuLoader, LuSend, LuPlus, LuGem,
    LuLock, LuEye, LuEyeOff, LuCamera, LuArrowRight, LuArrowLeft, LuUpload
} from 'react-icons/lu';
import { getWalletSummary, getWalletPasswordStatus } from '../../api/walletApi';
import { createTopUpRequest, getTopUpQR } from '../../api/topupApi';
import { fetchDropdowns, selectApps } from '../../store/slices/dropdownSlice';
import Button from '../common/Button';
import { 
    ModernModalLayout, 
    ModernFormSection, 
    ModernInputContainer, 
    ModernInput,
    ModernSelect 
} from '../common/ModernModal';
import { BASE_URL } from '../../config/constants';

const TopUpModal = ({ isOpen, onClose, onRefresh }) => {
    const dispatch = useDispatch();
    const apps = useSelector(selectApps);

    // Core Data State
    const [walletInfo, setWalletInfo] = useState({ balance: 0 });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: Confirmation (Password + Proof)
    const [qrData, setQrData] = useState(null);

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
        walletPassword: '',
        paymentMethod: 'Online', // Default
        utrNumber: '',
        paymentProof: null
    });

    useEffect(() => {
        if (isOpen) {
            initModal();
            dispatch(fetchDropdowns());
        }
    }, [isOpen, dispatch]);

    const initModal = async () => {
        try {
            setLoading(true);
            const [walletRes, passStatus, qrRes] = await Promise.all([
                getWalletSummary(),
                getWalletPasswordStatus(),
                getTopUpQR()
            ]);

            if (walletRes.success) setWalletInfo(walletRes.data);
            if (qrRes.success) setQrData(qrRes.data);
        } catch (err) {
            console.error("Initialization error:", err);
            showToast("error", "Failed to load wallet data");
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showToast = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const nextStep = () => {
        if (!formData.appId) return showToast("error", "Please select an app");
        if (!formData.targetUserId) return showToast("error", "Enter Target User ID");
        if (formData.targetUserId !== formData.confirmUserId) return showToast("error", "User IDs do not match");
        if (!formData.targetUserName) return showToast("error", "Enter Profile Name");
        if (!formData.amount) return showToast("error", "Enter Amount");
        if (parseFloat(formData.amount) !== parseFloat(formData.confirmAmount)) return showToast("error", "Amounts do not match");
        if (parseFloat(formData.amount) > walletInfo.balance) return showToast("error", "Insufficient wallet balance");
        if (!formData.agentCode) return showToast("error", "Enter Agent Code");
        if (formData.walletType === 'Cash' && !formData.utrNumber) return showToast("error", "Enter UTR/Transaction Number");
        
        setStep(2);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, paymentProof: e.target.files[0] });
        }
    };

    const handleRecharge = async (e) => {
        if (e) e.preventDefault();
        
        if (!formData.walletPassword) return showToast("error", "Please enter Wallet Password");
        if (formData.walletType === 'Cash' && !formData.paymentProof) return showToast("error", "Please upload Payment Proof photo");

        try {
            setIsSubmitting(true);
            
            const data = new FormData();
            data.append('appId', formData.appId);
            data.append('targetUserId', formData.targetUserId);
            data.append('targetUserName', formData.targetUserName);
            data.append('amount', formData.amount);
            data.append('walletType', formData.walletType);
            data.append('agentCode', formData.agentCode);
            data.append('walletPassword', formData.walletPassword);
            data.append('paymentMethod', formData.walletType === 'Cash' ? 'Cash' : 'Online');
            data.append('utrNumber', formData.utrNumber);
            
            if (formData.paymentProof) {
                data.append('paymentProof', formData.paymentProof);
            }

            const res = await createTopUpRequest(data);
            if (res.success) {
                showToast("success", "Recharge request submitted successfully!");
                setTimeout(() => {
                    onClose();
                    setStep(1); // Reset
                    if (onRefresh) onRefresh();
                }, 2000);
            } else {
                showToast("error", res.message || "Failed to submit request");
            }
        } catch (err) {
            showToast("error", err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Top Up For User"
            HeaderIcon={LuPlus}
        >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
                {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <LuLoader className="animate-spin text-brand-purple" size={32} />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading secure portal...</p>
                    </div>
                ) : (
                    <>
                        {step === 1 ? (
                            /* Step 1: Details */
                            <ModernFormSection>
                                <ModernInputContainer label="App Name" required>
                                    <ModernSelect 
                                        value={formData.appId}
                                        onChange={(val) => setFormData({...formData, appId: val})}
                                        options={apps.map(app => ({ value: app._id, label: app.appName }))}
                                    />
                                </ModernInputContainer>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ModernInputContainer label="Wallet Type" required>
                                        <ModernSelect 
                                            value={formData.walletType}
                                            onChange={(val) => setFormData({...formData, walletType: val})}
                                            options={[
                                                { value: 'Main Wallet', label: 'Main Wallet' },
                                                { value: 'Cash', label: 'Cash' }
                                            ]}
                                            icon={<LuGem size={18} className="text-blue-500" />}
                                        />
                                    </ModernInputContainer>
                                </div>

                                {formData.walletType === 'Cash' && qrData && (
                                    <div className="mt-2 mb-4 p-4 bg-white rounded-3xl border border-gray-100 flex flex-col items-center animate-in fade-in slide-in-from-top-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Scan QR to Pay</p>
                                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-purple-50 p-1 bg-white shadow-inner">
                                            <img 
                                                src={qrData.type === 'SCANNER' ? qrData.qrCode : (qrData.qrCode.startsWith('http') ? qrData.qrCode : `${BASE_URL}/${qrData.qrCode.startsWith('/') ? qrData.qrCode.substring(1) : qrData.qrCode}`)} 
                                                alt="Payment QR" 
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/400x400?text=QR+Code+Not+Available';
                                                }}
                                            />
                                        </div>
                                        <p className="text-[9px] font-bold text-emerald-600 mt-3 italic text-center text-wrap max-w-[200px]">Scan this QR to make your payment before uploading proof</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ModernInputContainer label="User ID" required>
                                        <ModernInput 
                                            name="targetUserId"
                                            placeholder="e.g. USER-123"
                                            value={formData.targetUserId}
                                            onChange={handleFormChange}
                                        />
                                    </ModernInputContainer>
                                    <ModernInputContainer label="Confirm User ID" required>
                                        <ModernInput 
                                            name="confirmUserId"
                                            placeholder="Re-enter ID"
                                            value={formData.confirmUserId}
                                            onChange={handleFormChange}
                                        />
                                    </ModernInputContainer>
                                </div>

                                <ModernInputContainer label="User Profile Name" required>
                                    <ModernInput 
                                        name="targetUserName"
                                        placeholder="Enter name as per profile"
                                        value={formData.targetUserName}
                                        onChange={handleFormChange}
                                    />
                                </ModernInputContainer>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ModernInputContainer label="Amount (₹)" required>
                                        <ModernInput 
                                            name="amount"
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={handleFormChange}
                                        />
                                    </ModernInputContainer>
                                    <ModernInputContainer label="Confirm Amount" required>
                                        <ModernInput 
                                            name="confirmAmount"
                                            type="number"
                                            placeholder="Re-enter"
                                            value={formData.confirmAmount}
                                            onChange={handleFormChange}
                                        />
                                    </ModernInputContainer>
                                </div>

                                <div className={`grid grid-cols-1 ${formData.walletType === 'Cash' ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} gap-4`}>
                                    <ModernInputContainer label="Agent Code" required>
                                        <ModernInput 
                                            name="agentCode"
                                            placeholder="Enter Auth Code"
                                            value={formData.agentCode}
                                            onChange={handleFormChange}
                                        />
                                    </ModernInputContainer>
                                    {formData.walletType === 'Cash' && (
                                        <ModernInputContainer label="UTR / Ref No" required>
                                            <ModernInput 
                                                name="utrNumber"
                                                placeholder="Txn ID / UTR"
                                                value={formData.utrNumber}
                                                onChange={handleFormChange}
                                            />
                                        </ModernInputContainer>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        variant="primary"
                                        className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2 shadow-xl shadow-purple-100"
                                        onClick={nextStep}
                                    >
                                        <span>Procced to Confirm</span>
                                        <LuArrowRight size={18} />
                                    </Button>
                                </div>
                            </ModernFormSection>
                        ) : (
                            /* Step 2: Confirmation & Password */
                            <ModernFormSection>
                                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 mb-2">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-amber-900 font-black uppercase text-xs tracking-widest">Confirm Details</h4>
                                        <button 
                                            onClick={() => setStep(1)}
                                            className="flex items-center space-x-1 text-amber-700 font-bold text-[10px] hover:underline cursor-pointer"
                                        >
                                            <LuArrowLeft size={12} />
                                            <span>Edit Details</span>
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-amber-900/50 uppercase">Target User</span>
                                            <span className="text-sm font-black text-amber-900">{formData.targetUserName} ({formData.targetUserId})</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-amber-900/50 uppercase">Amount</span>
                                            <span className="text-xl font-black text-amber-900">₹{formData.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-amber-900/50 uppercase">Method</span>
                                            <span className="text-sm font-black text-amber-700">{formData.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>

                                {formData.walletType === 'Cash' && (
                                    <ModernInputContainer label="Payment Proof (Photo)" required>
                                        <div className="relative group/upload">
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className={`w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                                                formData.paymentProof ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50 group-hover/upload:border-brand-purple/50'
                                            }`}>
                                                {formData.paymentProof ? (
                                                    <>
                                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                                                            <LuCheck size={20} />
                                                        </div>
                                                        <p className="text-[10px] font-black text-emerald-700 uppercase">{formData.paymentProof.name}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <LuCamera size={24} className="text-gray-400 mb-2" />
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Click to Upload Photo</p>
                                                        <p className="text-[9px] text-gray-400 font-bold mt-1">Required for Cash Payments</p>
                                                    </>
                                                )
                                            }
                                            </div>
                                        </div>
                                    </ModernInputContainer>
                                )}

                                <ModernInputContainer label="Verify Wallet Password" required>
                                    <div className="relative">
                                        <ModernInput 
                                            name="walletPassword"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter Password to Confirm"
                                            value={formData.walletPassword}
                                            onChange={handleFormChange}
                                            autoFocus
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-purple cursor-pointer"
                                        >
                                            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-3 px-1 text-amber-600">
                                        <LuLock size={12} />
                                        <p className="text-[10px] font-bold">This is a secure 256-bit encrypted transaction</p>
                                    </div>
                                </ModernInputContainer>

                                <div className="pt-4">
                                    <Button 
                                        variant="primary"
                                        className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2"
                                        onClick={handleRecharge}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <LuLoader className="animate-spin" /> : <LuSend size={18} />}
                                        <span>{isSubmitting ? 'Submitting...' : 'Confirm & Recharge'}</span>
                                    </Button>
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="w-full py-3 mt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors cursor-pointer"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </ModernFormSection>
                        )}

                        {message && (
                            <div className={`mx-4 p-4 rounded-xl border flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 ${
                                message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                            }`}>
                                {message.type === 'success' ? <LuCheck size={20} /> : <LuInfo size={20} />}
                                <p className="text-sm font-bold">{message.text}</p>
                            </div>
                        )}
                        
                        <div className="py-4 text-center">
                            <p className="text-gray-400 text-[11px] font-black italic tracking-wide">Secure Payment Portal • Rajput Entertainment Hub</p>
                        </div>
                    </>
                )}
            </div>
        </ModernModalLayout>
    );
};

export default TopUpModal;
