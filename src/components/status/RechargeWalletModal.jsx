import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    LuWallet, LuCheck, LuInfo, 
    LuLoader, LuSend, LuPlus,
    LuCamera, LuArrowRight, LuArrowLeft, LuUpload, LuHash, LuUser
} from 'react-icons/lu';
import { submitRechargeRequest, getPaymentMethods } from '../../api/rechargeApi';
import Button from '../common/Button';
import { 
    ModernModalLayout, 
    ModernFormSection, 
    ModernInputContainer, 
    ModernInput,
    ModernSelect 
} from '../common/ModernModal';

const RechargeWalletModal = ({ isOpen, onClose, onRefresh }) => {
    const { user } = useSelector((state) => state.auth);

    // Form State
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: Proof
    const [formData, setFormData] = useState({
        agentId: '',
        agentName: '',
        amount: '',
        rechargeType: 'UPI',
        utrNumber: '',
        paymentProof: null
    });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [methodsLoading, setMethodsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setFormData(prev => ({
                ...prev,
                agentId: user.agentId || user._id || '',
                agentName: user.fullName || ''
            }));
            fetchMethods();
        }
    }, [isOpen, user]);

    const fetchMethods = async () => {
        try {
            setMethodsLoading(true);
            const res = await getPaymentMethods();
            if (res.success) {
                setPaymentMethods(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch payment methods:", err);
        } finally {
            setMethodsLoading(false);
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
        if (!formData.amount || formData.amount <= 0) return showToast("error", "Please enter a valid amount");
        if (!formData.utrNumber) return showToast("error", "Enter UTR/Transaction Number");
        if (!formData.agentId) return showToast("error", "Agent ID is required");
        if (!formData.agentName) return showToast("error", "Agent Name is required");
        
        setStep(2);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, paymentProof: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (!formData.paymentProof) return showToast("error", "Please upload Payment Proof photo");

        try {
            setIsSubmitting(true);
            
            const data = new FormData();
            data.append('agentId', formData.agentId);
            data.append('agentName', formData.agentName);
            data.append('amount', formData.amount);
            data.append('rechargeType', formData.rechargeType);
            data.append('utrNumber', formData.utrNumber);
            data.append('paymentProof', formData.paymentProof);

            const res = await submitRechargeRequest(data);
            if (res.success) {
                showToast("success", "Recharge request submitted successfully!");
                setTimeout(() => {
                    handleClose();
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

    const handleClose = () => {
        setStep(1);
        setFormData({
            agentId: user?.agentId || user?._id || '',
            agentName: user?.fullName || '',
            amount: '',
            rechargeType: 'UPI',
            utrNumber: '',
            paymentProof: null
        });
        onClose();
    };

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={handleClose}
            title="Recharge My Wallet"
            HeaderIcon={LuWallet}
        >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
                {step === 1 ? (
                    <ModernFormSection>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ModernInputContainer label="Agent ID" required>
                                <ModernInput 
                                    name="agentId"
                                    placeholder="e.g. AGT123"
                                    value={formData.agentId}
                                    onChange={handleFormChange}
                                />
                            </ModernInputContainer>
                            <ModernInputContainer label="Agent Name" required>
                                <ModernInput 
                                    name="agentName"
                                    placeholder="Your Name"
                                    value={formData.agentName}
                                    onChange={handleFormChange}
                                />
                            </ModernInputContainer>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ModernInputContainer label="Recharge Type" required>
                                <ModernSelect 
                                    value={formData.rechargeType}
                                    onChange={(val) => setFormData({...formData, rechargeType: val})}
                                    options={[
                                        { value: 'UPI', label: 'UPI / GPay' },
                                        { value: 'SCANNER', label: 'Cash (Scan QR)' },
                                        { value: 'NEFT', label: 'NEFT / Bank' }
                                    ]}
                                />
                            </ModernInputContainer>
                            <ModernInputContainer label="Amount (₹)" required>
                                <ModernInput 
                                    name="amount"
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={formData.amount}
                                    onChange={handleFormChange}
                                />
                            </ModernInputContainer>
                        </div>

                        {/* Payment Details Display */}
                        <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Payment Details</h5>
                                {methodsLoading && <LuLoader className="animate-spin text-brand-purple" size={14} />}
                            </div>

                            {(formData.rechargeType === 'UPI' || formData.rechargeType === 'SCANNER') && (
                                <div className="space-y-4">
                                    {(formData.rechargeType === 'SCANNER' 
                                        ? paymentMethods.filter(m => m.type === 'SCANNER')
                                        : paymentMethods.filter(m => m.type === 'UPI')
                                    ).length > 0 ? (
                                        (formData.rechargeType === 'SCANNER' 
                                            ? paymentMethods.filter(m => m.type === 'SCANNER')
                                            : paymentMethods.filter(m => m.type === 'UPI')
                                        ).map((upi, i) => (
                                            <div key={i} className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-purple-50">
                                                <p className="text-xs font-black text-gray-900 mb-1">{upi.title}</p>
                                                {upi.upiId && (
                                                    <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-full">
                                                        <span className="text-sm font-bold text-brand-purple tracking-tight">{upi.upiId}</span>
                                                        <button 
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(upi.upiId);
                                                                showToast("success", "UPI ID Copied!");
                                                            }}
                                                            className="text-[10px] font-black text-purple-400 hover:text-brand-purple active:scale-90 transition-all cursor-pointer"
                                                        >
                                                            COPY
                                                        </button>
                                                    </div>
                                                )}
                                                {upi.qrCode && (
                                                    <div className="relative w-40 h-40 mt-3 rounded-2xl overflow-hidden border-4 border-purple-50 p-1 bg-white shadow-inner">
                                                        <img src={upi.qrCode} alt="Scanner" className="w-full h-full object-contain" />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[10px] text-gray-400 font-medium text-center py-2 italic">No {formData.rechargeType === 'SCANNER' ? 'Scanner' : 'UPI'} methods available</p>
                                    )}
                                </div>
                            )}

                            {formData.rechargeType === 'NEFT' && (
                                <div className="space-y-3">
                                    {paymentMethods.filter(m => m.type === 'NEFT').length > 0 ? (
                                        paymentMethods.filter(m => m.type === 'NEFT').map((bank, i) => (
                                            <div key={i} className="p-4 bg-white rounded-2xl border border-emerald-50 space-y-2">
                                                <p className="text-xs font-black text-gray-900 border-b border-gray-50 pb-2">{bank.title}</p>
                                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                                    <div>
                                                        <p className="font-bold text-gray-400 uppercase tracking-wider">Bank Name</p>
                                                        <p className="font-black text-gray-700">{bank.bankName}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-400 uppercase tracking-wider">Account No</p>
                                                        <p className="font-black text-gray-700">{bank.accountNumber}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="font-bold text-gray-400 uppercase tracking-wider">IFSC Code</p>
                                                        <p className="font-black text-emerald-600">{bank.ifscCode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[10px] text-gray-400 font-medium text-center py-2 italic">No bank methods available</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <ModernInputContainer label="UTR / Transaction Number" required>
                            <ModernInput 
                                name="utrNumber"
                                placeholder="Enter UTR/Reference No"
                                value={formData.utrNumber}
                                onChange={handleFormChange}
                            />
                        </ModernInputContainer>

                        <div className="pt-4">
                            <Button 
                                variant="primary"
                                className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2 shadow-xl shadow-purple-100"
                                onClick={nextStep}
                            >
                                <span>Add Payment Proof</span>
                                <LuArrowRight size={18} />
                            </Button>
                        </div>
                    </ModernFormSection>
                ) : (
                    <ModernFormSection>
                        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-brand-purple font-black uppercase text-xs tracking-widest">Confirm Recharge</h4>
                                <button 
                                    onClick={() => setStep(1)}
                                    className="flex items-center space-x-1 text-brand-purple font-bold text-[10px] hover:underline cursor-pointer"
                                >
                                    <LuArrowLeft size={12} />
                                    <span>Edit</span>
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Amount</span>
                                    <span className="text-lg font-black text-gray-900">₹{formData.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">UTR No</span>
                                    <span className="text-xs font-bold text-gray-700">{formData.utrNumber}</span>
                                </div>
                            </div>
                        </div>

                        <ModernInputContainer label="Payment Proof (Image/Screenshot)" required>
                            <div className="relative group/upload">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className={`w-full h-40 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${
                                    formData.paymentProof ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50 group-hover/upload:border-brand-purple/50'
                                }`}>
                                    {formData.paymentProof ? (
                                        <>
                                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                                                <LuCheck size={24} />
                                            </div>
                                            <p className="text-xs font-bold text-emerald-700">{formData.paymentProof.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <LuCamera size={32} className="text-gray-400 mb-2" />
                                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Upload Screenshot</p>
                                            <p className="text-[9px] text-gray-400 font-bold mt-1 text-center px-4">Screenshot of your successful transaction is required</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </ModernInputContainer>

                        <div className="pt-6">
                            <Button 
                                variant="primary"
                                className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LuLoader className="animate-spin" /> : <LuSend size={18} />}
                                <span>{isSubmitting ? 'Submitting...' : 'Submit Recharge'}</span>
                            </Button>
                        </div>
                    </ModernFormSection>
                )}

                {message && (
                    <div className={`mx-4 p-4 rounded-2xl border flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 ${
                        message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                        {message.type === 'success' ? <LuCheck size={20} /> : <LuInfo size={20} />}
                        <p className="text-sm font-bold">{message.text}</p>
                    </div>
                )}
            </div>
        </ModernModalLayout>
    );
};

export default RechargeWalletModal;
