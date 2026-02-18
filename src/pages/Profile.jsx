import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import { 
    LuUser, LuMail, LuSave, LuLoader, LuCheck, 
    LuInfo, LuShield, LuChevronRight, LuEye, 
    LuEyeOff, LuLock 
} from 'react-icons/lu';
import { getWalletPasswordStatus, updateWalletPassword } from '../api/walletApi';
import { ModernModalLayout, ModernFormSection, ModernInputContainer, ModernInput } from '../components/common/ModernModal';

const Profile = () => {
    const { user, updateUser, loading, error, success, clearError } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: ''
    });

    const [message, setMessage] = useState(null);
    const [copied, setCopied] = useState(false);

    // Wallet Security State
    const [hasWalletPassword, setHasWalletPassword] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [pinLoading, setPinLoading] = useState(false);
    const [pinData, setPinData] = useState({
        password: '',
        newWalletPassword: '',
        confirmPin: ''
    });
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showNewPin, setShowNewPin] = useState(false);

    useEffect(() => {
        fetchPasswordStatus();
    }, []);

    const fetchPasswordStatus = async () => {
        try {
            const res = await getWalletPasswordStatus();
            if (res.success) {
                setHasWalletPassword(res.hasWalletPassword);
            }
        } catch (err) {
            console.error("Error fetching PIN status:", err);
        }
    };

    const copyInviteCode = () => {
        if (user?.inviteId) {
            navigator.clipboard.writeText(user.inviteId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || user.name || '',
                email: user.email || '',
                gender: user.gender || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (success) {
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(null), 3000);
        }
    }, [success]);

    // Clear errors when unmounting or switching pages
    useEffect(() => {
        return () => clearError();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        await updateUser(formData);
    };

    const handlePinSubmit = async (e) => {
        e.preventDefault();
        if (pinData.newWalletPassword !== pinData.confirmPin) {
            setMessage({ type: 'error', text: "Confirm PIN does not match!" });
            return;
        }

        try {
            setPinLoading(true);
            const res = await updateWalletPassword({
                password: pinData.password,
                newWalletPassword: pinData.newWalletPassword
            });

            if (res.success) {
                setMessage({ type: 'success', text: res.message || "Wallet password updated successfully!" });
                setIsPinModalOpen(false);
                setPinData({ password: '', newWalletPassword: '', confirmPin: '' });
                fetchPasswordStatus();
            } else {
                setMessage({ type: 'error', text: res.message || "Failed to update PIN" });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message || "Something went wrong" });
        } finally {
            setPinLoading(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl w-full">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-brand-purple/5 p-8 border-b border-gray-100 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
                            {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName || user?.name || 'User Profile'}</h1>
                            <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-brand-purple">
                                Member
                            </div>
                        </div>
                    </div>

                    {/* Invite Code Section */}
                    {user?.inviteId && (
                        <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-1">Your Referral Code</h3>
                                    <p className="text-xs text-gray-500">Share this code with friends to earn rewards!</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white px-6 py-3 rounded-xl border-2 border-purple-200 font-mono text-lg font-bold text-brand-purple">
                                        {user.inviteId}
                                    </div>
                                    <button
                                        onClick={copyInviteCode}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${copied
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                                            }`}
                                    >
                                        {copied ? '✓ Copied!' : 'Copy Code'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Information</h2>
                            <p className="text-gray-500 text-sm">Update your personal details below.</p>
                        </div>

                        {message && (
                            <div className={`mb-6 p-4 rounded-2xl border flex items-center space-x-3 transition-all animate-in fade-in zoom-in-95 ${
                                typeof message === 'string' ? 'bg-green-50 border-green-200 text-green-700' : 
                                message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'
                            }`}>
                                { (typeof message === 'string' || message.type === 'success') ? <LuCheck size={20} /> : <LuInfo size={20} /> }
                                <p className="text-sm font-bold">{typeof message === 'string' ? message : message.text}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LuUser className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                            placeholder="Enter full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LuMail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                            placeholder="Enter email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Male', 'Female', 'Other'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: option.toLowerCase() })}
                                                className={`
                                                    py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer
                                                    ${formData.gender === option.toLowerCase()
                                                        ? 'bg-brand-purple text-white border-brand-purple shadow-md shadow-purple-100'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-purple/50 hover:bg-purple-50'
                                                    }
                                                `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="px-8 py-3 group flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <LuLoader className="animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LuSave />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Wallet Security Section - Added to original UI */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Wallet Security</h2>
                                <p className="text-gray-500 text-sm">Set your transaction PIN for secure withdrawals.</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                        <LuShield size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Transaction PIN</p>
                                        <p className="text-xs text-gray-500">{hasWalletPassword ? 'Password is set' : 'Not set yet'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsPinModalOpen(true)}
                                    className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-amber-200 text-amber-600 rounded-xl font-bold hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
                                >
                                    {hasWalletPassword ? 'Change Wallet Password' : 'Set Wallet Password'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PIN Setup Modal */}
            <ModernModalLayout
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                title={hasWalletPassword ? "Change Transaction PIN" : "Setup Transaction PIN"}
                HeaderIcon={LuShield}
            >
                <form onSubmit={handlePinSubmit} className="space-y-6">
                    <p className="text-gray-400 text-xs font-bold text-center leading-relaxed">
                        This PIN will be required for all transfers and withdrawals. Keep it secure and don't share it.
                    </p>
                    
                    <ModernFormSection>
                        <ModernInputContainer label="Current Login Password" required>
                            <div className="relative">
                                <ModernInput 
                                    type={showLoginPassword ? "text" : "password"}
                                    placeholder="Enter your account password"
                                    required
                                    value={pinData.password}
                                    onChange={(e) => setPinData({...pinData, password: e.target.value})}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-purple transition-colors cursor-pointer"
                                >
                                    {showLoginPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                        </ModernInputContainer>

                        <ModernInputContainer label="New Wallet Password" required>
                            <div className="relative">
                                <ModernInput 
                                    type={showNewPin ? "text" : "password"}
                                    placeholder="Enter 4-digit PIN or password"
                                    required
                                    value={pinData.newWalletPassword}
                                    onChange={(e) => setPinData({...pinData, newWalletPassword: e.target.value})}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowNewPin(!showNewPin)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-purple transition-colors cursor-pointer"
                                >
                                    {showNewPin ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                        </ModernInputContainer>

                        <ModernInputContainer label="Confirm New PIN" required>
                            <ModernInput 
                                type="password"
                                placeholder="Re-enter your new PIN"
                                required
                                value={pinData.confirmPin}
                                onChange={(e) => setPinData({...pinData, confirmPin: e.target.value})}
                            />
                        </ModernInputContainer>
                    </ModernFormSection>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsPinModalOpen(false)}
                            className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={pinLoading}
                            className="flex-[2] py-4 bg-amber-500 text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-100 hover:bg-amber-600 active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 cursor-pointer"
                        >
                            {pinLoading ? <LuLoader className="animate-spin" /> : <LuCheck size={20} />}
                            <span>{pinLoading ? 'Saving...' : 'Update Security'}</span>
                        </button>
                    </div>
                </form>
            </ModernModalLayout>
        </div>
    );
};

export default Profile;
