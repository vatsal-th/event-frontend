import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuMic, LuCheck, LuInfo, LuLoader } from 'react-icons/lu';
import Button from '../common/Button';
import {
    ModernModalLayout,
    ModernFormSection,
    ModernInputContainer,
    ModernInput,
    ModernSelect
} from '../common/ModernModal';
import {
    fetchDropdowns,
    selectCountries,
    selectCategories,
    selectApps
} from '../../store/slices/dropdownSlice';
import { submitHostingApplication } from '../../api/hostingApi';

const ApplyForHostingModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const countries = useSelector(selectCountries);
    const categories = useSelector(selectCategories);
    const apps = useSelector(selectApps);

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        countryId: '',
        gender: '',
        categoryId: '',
        talent: 'Dancer',
        appId: '',
        inviterId: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchDropdowns());
        }
    }, [dispatch, isOpen]);

    // Set default values when dropdowns are loaded
    useEffect(() => {
        if (countries.length > 0 && !formData.countryId) {
            const india = countries.find(c => c.name === 'India') || countries[0];
            setFormData(prev => ({ ...prev, countryId: india._id }));
        }
        if (categories.length > 0 && !formData.categoryId) {
            setFormData(prev => ({ ...prev, categoryId: categories[0]._id }));
        }
        if (apps.length > 0 && !formData.appId) {
            setFormData(prev => ({ ...prev, appId: apps[0]._id }));
        }
    }, [countries, categories, apps]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleApply = async () => {
        if (!formData.name || !formData.mobile || !formData.countryId || !formData.categoryId || !formData.appId) {
            setSubmitError('Please fill in all required fields');
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const payload = {
                fullName: formData.name,
                mobileNumber: formData.mobile,
                countryId: formData.countryId,
                gender: formData.gender,
                categoryId: formData.categoryId,
                talent: formData.talent,
                appId: formData.appId,
                inviterId: formData.inviterId
            };

            const response = await submitHostingApplication(payload);

            if (response.success) {
                showToast('Application submitted successfully!', 'success');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setSubmitError(response.message || 'Failed to submit application');
            }
        } catch (error) {
            setSubmitError(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCountryIcon = (countryId) => {
        const country = countries.find(c => c._id === countryId);
        if (!country) return '🌐';

        const icons = {
            'India': '🇮🇳',
            'USA': '🇺🇸',
            'United States': '🇺🇸',
            'UAE': '🇦🇪',
            'United Arab Emirates': '🇦🇪'
        };
        return icons[country.name] || '🌐';
    };

    const countryOptions = countries.map(c => ({
        value: c._id,
        label: c.name,
        icon: <span>{getCountryIcon(c._id)}</span>
    }));

    const genderOptions = [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' }
    ];

    const categoryOptions = categories.map(c => ({
        value: c._id,
        label: c.name
    }));

    const talentOptions = [
        { value: 'Dancer', label: 'Dancer' },
        { value: 'Singer', label: 'Singer' },
        { value: 'Chatter', label: 'Chatter' }
    ];

    const appOptions = apps.map(app => ({
        value: app._id,
        label: app.appName
    }));

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Hosting"
            HeaderIcon={LuMic}
        >
            <ModernFormSection>
                {/* Toast Notification */}
                {toast && (
                    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm transition-all duration-300 animate-in slide-in-from-bottom-4 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                        <div className="flex items-center space-x-2">
                            {toast.type === 'success' ? <LuCheck /> : <LuInfo />}
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )}

                {/* Submit Error */}
                {submitError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
                        <LuInfo size={16} className="shrink-0" />
                        <span>{submitError}</span>
                    </div>
                )}

                {/* Name */}
                <ModernInputContainer label="Name">
                    <ModernInput
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Mobile Number */}
                <ModernInputContainer label="Mobile Number">
                    <ModernInput
                        type="text"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="Enter mobile number"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Country & Gender */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Country">
                        <ModernSelect
                            value={formData.countryId}
                            options={countryOptions}
                            onChange={(val) => setFormData({ ...formData, countryId: val })}
                            leftIconExtra={countryOptions.find(opt => opt.value === formData.countryId)?.icon}
                            disabled={isSubmitting}
                        />
                    </ModernInputContainer>
                    <ModernInputContainer label="Gender">
                        <ModernSelect
                            value={formData.gender}
                            options={genderOptions}
                            onChange={(val) => setFormData({ ...formData, gender: val })}
                            disabled={isSubmitting}
                        />
                    </ModernInputContainer>
                </div>

                {/* Category & Talent */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Category">
                        <ModernSelect
                            value={formData.categoryId}
                            options={categoryOptions}
                            onChange={(val) => setFormData({ ...formData, categoryId: val })}
                            disabled={isSubmitting}
                        />
                    </ModernInputContainer>
                    <ModernInputContainer label="Talent">
                        <ModernSelect
                            value={formData.talent}
                            options={talentOptions}
                            onChange={(val) => setFormData({ ...formData, talent: val })}
                            disabled={isSubmitting}
                        />
                    </ModernInputContainer>
                </div>

                {/* Apply For App Name */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pt-2">
                    <label className="text-[#1a1a1a]/80 text-sm font-black whitespace-nowrap px-1">Apply For App Name =</label>
                    <ModernSelect
                        value={formData.appId}
                        options={appOptions}
                        onChange={(val) => setFormData({ ...formData, appId: val })}
                        className="w-full"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Inviter ID */}
                <ModernInputContainer label="Inviter ID">
                    <ModernInput
                        type="text"
                        value={formData.inviterId}
                        onChange={(e) => setFormData({ ...formData, inviterId: e.target.value })}
                        placeholder="Enter inviter ID"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Info Section */}
                <div className="space-y-4 pt-4 px-1 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Created By =</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black">Automatic</span>
                    </div>
                </div>
            </ModernFormSection>

            <div className="space-y-5 pt-8 pb-4 text-center px-4">
                <Button
                    variant="primary"
                    className="w-full py-4 rounded-[20px] text-lg flex items-center justify-center space-x-2"
                    onClick={handleApply}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <LuLoader className="animate-spin" size={20} />
                            <span>Applying...</span>
                        </>
                    ) : (
                        <span>Apply</span>
                    )}
                </Button>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForHostingModal;

