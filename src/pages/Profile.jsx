import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import { LuUser, LuMail, LuSave, LuLoader, LuCheck, LuInfo } from 'react-icons/lu';

const Profile = () => {
    const { user, updateUser, loading, error, success, clearError } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: ''
    });

    const [message, setMessage] = useState(null);
    const [copied, setCopied] = useState(false);

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

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center space-x-2 text-sm mb-6 animate-in fade-in slide-in-from-top-2">
                                <LuInfo size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center space-x-2 text-sm mb-6 animate-in fade-in slide-in-from-top-2">
                                <LuCheck size={18} />
                                <span>{message}</span>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
