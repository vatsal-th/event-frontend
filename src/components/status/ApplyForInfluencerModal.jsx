import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuCalendar, LuSmartphone, LuGlobe, LuInstagram, LuCheck, LuInfo, LuLoader } from 'react-icons/lu';
import Button from '../common/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    ModernModalLayout,
    ModernFormSection,
    ModernInputContainer,
    ModernInput,
    ModernSelect,
    getModernPickerStyles
} from '../common/ModernModal';
import {
    fetchDropdowns,
    selectCountries
} from '../../store/slices/dropdownSlice';
import { submitInfluencerApplication } from '../../api/influencerApi';

const ApplyForInfluencerModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const countries = useSelector(selectCountries);

    const [formData, setFormData] = useState({
        name: '',
        entryDate: dayjs(),
        whatsapp: '',
        countryId: '',
        gender: '',
        socialMediaId: '',
        instagramFollowers: '',
        instagramLink: '',
        verificationStatus: 'Yes',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchDropdowns());
        }
    }, [dispatch, isOpen]);

    // Set default country when dropdowns load
    useEffect(() => {
        if (countries.length > 0 && !formData.countryId) {
            const india = countries.find(c => c.name === 'India') || countries[0];
            setFormData(prev => ({ ...prev, countryId: india._id }));
        }
    }, [countries]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleApply = async () => {
        if (!formData.name || !formData.whatsapp || !formData.countryId || !formData.socialMediaId || !formData.instagramFollowers) {
            setSubmitError('Please fill in all required fields');
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const payload = {
                fullName: formData.name,
                entryDate: formData.entryDate.format('MM/DD/YYYY'),
                whatsAppNumber: formData.whatsapp,
                countryId: formData.countryId,
                gender: formData.gender,
                socialMediaId: formData.socialMediaId,
                instagramFollowers: formData.instagramFollowers,
                instagramLink: formData.instagramLink
            };

            const response = await submitInfluencerApplication(payload);

            if (response.success) {
                showToast('Influencer application submitted successfully!', 'success');
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


    const verificationOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Influencer"
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

                {/* Entry Date */}
                <ModernInputContainer label="Entry Date">
                    <DatePicker
                        value={formData.entryDate}
                        onChange={(newDate) => setFormData({ ...formData, entryDate: newDate })}
                        slots={{ openPickerIcon: LuCalendar }}
                        disabled={isSubmitting}
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: getModernPickerStyles(),
                                fullWidth: true,
                                inputProps: { readOnly: true },
                            },
                            desktopPaper: { sx: { zIndex: 2000 } }
                        }}
                    />
                </ModernInputContainer>

                {/* WhatsApp Number */}
                <ModernInputContainer label="WhatsApp Number">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pr-2 border-r border-[#1a1a1a]/10 pointer-events-none">
                            <span className="text-lg mr-1">🇮🇳</span>
                        </div>
                        <ModernInput
                            type="text"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className="!pl-14"
                            disabled={isSubmitting}
                        />
                    </div>
                </ModernInputContainer>

                {/* Country & Gender */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Select Country">
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

                {/* Social Media ID */}
                <ModernInputContainer label="Social Media ID">
                    <ModernInput
                        type="text"
                        value={formData.socialMediaId}
                        onChange={(e) => setFormData({ ...formData, socialMediaId: e.target.value })}
                        placeholder="Enter ID"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Instagram Followers */}
                <ModernInputContainer label="Instagram Followers">
                    <ModernInput
                        type="text"
                        value={formData.instagramFollowers}
                        onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                        placeholder="Enter count"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Instagram Link */}
                <ModernInputContainer label="Instagram Link">
                    <ModernInput
                        type="text"
                        value={formData.instagramLink}
                        onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                        placeholder="Enter Instagram profile link"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Verification Status */}
                <ModernInputContainer label="Verification Status">
                    <ModernSelect
                        value={formData.verificationStatus}
                        options={verificationOptions}
                        onChange={(val) => setFormData({ ...formData, verificationStatus: val })}
                        className="w-full"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>
            </ModernFormSection>

            <div className="space-y-5 pt-8 pb-4 text-center px-4">
                <Button
                    variant="primary"
                    className="w-full py-4 flex items-center justify-center space-x-2"
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
                <p className="text-gray-400 text-[13px] font-black italic tracking-wide">Apply more event & Win Scratch Card</p>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForInfluencerModal;

