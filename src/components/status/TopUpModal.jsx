import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    LuWallet, LuCheck, LuInfo, 
    LuLoader, LuSend, LuPlus, LuGem,
    LuLock, LuEye, LuEyeOff
} from 'react-icons/lu';
import { getWalletSummary, getWalletPasswordStatus } from '../../api/walletApi';
import { createTopUpRequest } from '../../api/topupApi';
import { fetchDropdowns, selectApps } from '../../store/slices/dropdownSlice';
import Button from '../common/Button';
import { 
    ModernModalLayout, 
    ModernFormSection, 
    ModernInputContainer, 
    ModernInput,
    ModernSelect 
} from '../common/ModernModal';

const TopUpModal = ({ isOpen, onClose, onRefresh }) => {
    const dispatch = useDispatch();
    const apps = useSelector(selectApps);

    // Core Data State
    const [walletInfo, setWalletInfo] = useState({ balance: 0 });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        appId: '',
        targetUserId: '',
        confirmUserId: '',
        targetUserName: '',
        amount: '',
        confirmAmount: '',
        agentCode: '',
        walletType: 'Beans',
        walletPassword: ''
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
            const [walletRes] = await Promise.all([
                getWalletSummary(),
                getWalletPasswordStatus()
            ]);

            if (walletRes.success) setWalletInfo(walletRes.data);
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

    const handleRecharge = async (e) => {
        if (e) e.preventDefault();
        
        // Validations
        if (!formData.appId) return showToast("error", "Please select an app");
        if (!formData.walletType) return showToast("error", "Please select wallet type");
        if (formData.targetUserId !== formData.confirmUserId) return showToast("error", "User IDs do not match");
        if (parseFloat(formData.amount) !== parseFloat(formData.confirmAmount)) return showToast("error", "Amounts do not match");
        if (parseFloat(formData.amount) > walletInfo.balance) return showToast("error", "Insufficient wallet balance");
        if (!formData.walletPassword) return showToast("error", "Please enter Wallet Password");

        try {
            setIsSubmitting(true);
            const payload = {
                appId: formData.appId,
                targetUserId: formData.targetUserId,
                targetUserName: formData.targetUserName,
                amount: parseFloat(formData.amount),
                walletType: formData.walletType,
                agentCode: formData.agentCode,
                walletPassword: formData.walletPassword
            };

            const res = await createTopUpRequest(payload);
            if (res.success) {
                showToast("success", "Recharge request submitted successfully!");
                setTimeout(() => {
                    onClose();
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
                        <ModernFormSection>
                            <ModernInputContainer label="App Name" required>
                                <ModernSelect 
                                    value={formData.appId}
                                    onChange={(val) => setFormData({...formData, appId: val})}
                                    options={apps.map(app => ({ value: app._id, label: app.appName }))}
                                />
                            </ModernInputContainer>

                            <ModernInputContainer label="Wallet Type" required>
                                <ModernSelect 
                                    value={formData.walletType}
                                    onChange={(val) => setFormData({...formData, walletType: val})}
                                    options={[
                                        { value: 'Beans', label: 'Main Wallet' },
                                        { value: 'Diamonds', label: 'Diamonds' },
                                        { value: 'Seeds', label: 'Seeds' },
                                        { value: 'Points', label: 'Points' }
                                    ]}
                                    icon={<LuGem size={18} className="text-blue-500" />}
                                />
                            </ModernInputContainer>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ModernInputContainer label="User ID" required>
                                    <ModernInput 
                                        name="targetUserId"
                                        placeholder="e.g. USER-123"
                                        required
                                        value={formData.targetUserId}
                                        onChange={handleFormChange}
                                    />
                                </ModernInputContainer>
                                <ModernInputContainer label="Confirm User ID" required>
                                    <ModernInput 
                                        name="confirmUserId"
                                        placeholder="Re-enter ID"
                                        required
                                        value={formData.confirmUserId}
                                        onChange={handleFormChange}
                                    />
                                </ModernInputContainer>
                            </div>

                            <ModernInputContainer label="User Profile Name" required>
                                <ModernInput 
                                    name="targetUserName"
                                    placeholder="Enter name as per profile"
                                    required
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
                                        required
                                        value={formData.amount}
                                        onChange={handleFormChange}
                                    />
                                </ModernInputContainer>
                                <ModernInputContainer label="Confirm Amount" required>
                                    <ModernInput 
                                        name="confirmAmount"
                                        type="number"
                                        placeholder="Re-enter"
                                        required
                                        value={formData.confirmAmount}
                                        onChange={handleFormChange}
                                    />
                                </ModernInputContainer>
                            </div>

                            <ModernInputContainer label="Your Agent Code" required>
                                <ModernInput 
                                    name="agentCode"
                                    placeholder="Enter authorization code"
                                    required
                                    value={formData.agentCode}
                                    onChange={handleFormChange}
                                />
                            </ModernInputContainer>

                            <ModernInputContainer label="Wallet Password" required>
                                <div className="relative">
                                    <ModernInput 
                                        name="walletPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Wallet Password"
                                        required
                                        value={formData.walletPassword}
                                        onChange={handleFormChange}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-purple cursor-pointer"
                                    >
                                        {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                    </button>
                                </div>
                            </ModernInputContainer>
                        </ModernFormSection>
                          {message && (
                    <div className={`p-4 rounded-xl border flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 ${
                        message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                        {message.type === 'success' ? <LuCheck size={20} /> : <LuInfo size={20} />}
                        <p className="text-sm font-bold">{message.text}</p>
                    </div>
                )}

                        <div className="space-y-5 pb-4 text-center px-4">
                            <Button 
                                variant="primary"
                                className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2"
                                onClick={handleRecharge}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LuLoader className="animate-spin" /> : <LuSend size={18} />}
                                <span>{isSubmitting ? 'Processing...' : 'Recharge Now'}</span>
                            </Button>
                            <p className="text-gray-400 text-[13px] font-black italic tracking-wide">Top up more users & Win Scratch Card</p>
                        </div>
                    </>
                )}
            </div>
        </ModernModalLayout>
    );
};

export default TopUpModal;
