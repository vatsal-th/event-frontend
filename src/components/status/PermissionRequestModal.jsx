import React, { useState } from 'react';
import { LuShieldAlert, LuCheck, LuInfo, LuLoader, LuSend } from 'react-icons/lu';
import Button from '../common/Button';
import {
    ModernModalLayout,
    ModernFormSection,
    ModernInputContainer,
    ModernInput
} from '../common/ModernModal';
import { requestPermission } from '../../api/permissionsApi';

const PermissionRequestModal = ({ isOpen, onClose, serviceName, existingRequest, onSuccess }) => {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const getServiceDisplayName = (name) => {
        switch (name) {
            case 'agency': return 'Apply for Agency';
            case 'topup': return 'Top Up For User';
            case 'recharge': return 'Recharge Wallet';
            default: return name;
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async () => {
        if (!text.trim()) {
            setError('Please enter a message explaining why you need access.');
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const response = await requestPermission({
                serviceName,
                text
            });

            if (response.success) {
                showToast('Permission request submitted successfully!', 'success');
                if (onSuccess) onSuccess();
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else if (response.message === "Permission already approved") {
                // Handle case where user was approved in background
                showToast('Permission already approved!', 'success');
                if (onSuccess) onSuccess();
                setTimeout(() => {
                    onClose();
                }, 1000);
            } else {
                setError(response.message || 'Failed to submit request');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const status = existingRequest?.status || 'None';
    const isPending = status === 'Pending';
    const isRejected = status === 'Rejected';

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title={getServiceDisplayName(serviceName)}
            HeaderIcon={LuShieldAlert}
        >
            <ModernFormSection>
                {/* Toast Notification */}
                {toast && (
                    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm transition-all duration-300 animate-in slide-in-from-bottom-4 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                        <div className="flex items-center space-x-2">
                            {toast.type === 'success' ? <LuCheck /> : <LuInfo />}
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )}

                {/* Status Section */}
                {isPending && (
                    <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100 text-center space-y-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                            <LuLoader className="text-orange-600 animate-spin" size={24} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-orange-900 font-black">Request Pending</h4>
                            <p className="text-orange-700 text-sm font-medium">Your request is currently being reviewed by an admin. Please wait for approval.</p>
                        </div>
                    </div>
                )}

                {isRejected && (
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-100 space-y-3">
                        <div className="flex items-center space-x-3 text-red-900 font-black">
                            <LuShieldAlert size={20} />
                            <h4>Request Rejected</h4>
                        </div>
                        <p className="text-red-700 text-sm font-medium leading-relaxed">
                            Reason: <span className="font-bold">{existingRequest.rejectionReason || 'No reason provided'}</span>
                        </p>
                        <div className="pt-2 border-t border-red-100">
                            <p className="text-red-800 text-xs font-black uppercase tracking-wider">You can resubmit your request below:</p>
                        </div>
                    </div>
                )}

                {!isPending && (
                    <>
                        {error && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
                                <LuInfo size={16} className="shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <p className="text-gray-500 text-sm font-medium px-1">
                                To access this service, you must first request permission from the admin. Please provide a brief explanation.
                            </p>
                            
                            <ModernInputContainer label="Your Message">
                                <textarea
                                    className="w-full bg-[#f3efff] border border-white/60 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400/30 shadow-sm transition-all min-h-[120px] resize-none"
                                    placeholder="Explain why you need access to this service..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </ModernInputContainer>
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="primary"
                                className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <LuLoader className="animate-spin" size={20} />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <LuSend size={20} />
                                        <span>Submit Request</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                )}

                {isPending && (
                    <div className="pt-4">
                        <Button
                            variant="secondary"
                            className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center"
                            onClick={onClose}
                        >
                            <span>Close</span>
                        </Button>
                    </div>
                )}
            </ModernFormSection>
        </ModernModalLayout>
    );
};

export default PermissionRequestModal;
