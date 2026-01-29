import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuCalendar, LuClock, LuGem, LuCheck, LuInfo, LuLoader } from 'react-icons/lu';
import Button from '../common/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
import { submitEventApplication } from '../../api/eventApi';

const ApplyForEventModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const countries = useSelector(selectCountries);

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        countryId: '',
        gender: '',
        agencyCode: '',
        budget: '',
        time: dayjs(),
        date: dayjs(),
        yourId: '',
        opponentId: ''
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
        if (!formData.name || !formData.mobile || !formData.countryId || !formData.agencyCode || !formData.budget) {
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
                agencyCode: formData.agencyCode,
                budget: formData.budget,
                eventTime: formData.time.format('hh:mm A'),
                eventDate: formData.date.format('MM/DD/YYYY'),
                yourId: formData.yourId,
                opponentId: formData.opponentId
            };

            const response = await submitEventApplication(payload);

            if (response.success) {
                showToast('Event application submitted successfully!', 'success');
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
            'UK': '🇬🇧',
            'United Kingdom': '🇬🇧',
            'UAE': '🇦🇪',
            'United Arab Emirates': '🇦🇪',
            'Pakistan': '🇵🇰'
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
        { value: 'Male', label: 'Male' },
        { value: 'Other', label: 'Other' }
    ];

    const budgetOptions = [
        {
            value: '5 lcs Diamond',
            label: <div className="flex justify-between items-center w-full pr-2"><span>5 lcs Diamond</span> <span className="text-[11px] font-black text-gray-400 ml-4">958,560</span></div>
        },
        {
            value: '10 lcs Diamond',
            label: <div className="flex justify-between items-center w-full pr-2"><span>10 lcs Diamond</span> <span className="text-[11px] font-black text-gray-400 ml-4">1,917,120</span></div>
        },
        {
            value: '20 lcs Diamond',
            label: <div className="flex justify-between items-center w-full pr-2"><span>20 lcs Diamond</span> <span className="text-[11px] font-black text-gray-400 ml-4">3,834,240</span></div>
        },
        {
            value: '60 lcs Diamond',
            label: <div className="flex justify-between items-center w-full pr-2"><span>60 lcs Diamond</span> <span className="text-[11px] font-black text-gray-400 ml-4">11,502,720</span></div>
        },
        {
            value: '1 cr Diamond',
            label: <div className="flex justify-between items-center w-full pr-2"><span>1 cr Diamond</span> <span className="text-[11px] font-black text-gray-400 ml-4">19,171,200</span></div>
        }
    ];

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Event"
            id="58488383"
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
                        placeholder="Enter your name"
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

                {/* Agency Code */}
                <ModernInputContainer label="Agency Code">
                    <ModernInput
                        type="text"
                        value={formData.agencyCode}
                        onChange={(e) => setFormData({ ...formData, agencyCode: e.target.value })}
                        placeholder="Enter agency code"
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Budget */}
                <ModernInputContainer label="Budget">
                    <ModernSelect
                        value={formData.budget}
                        options={budgetOptions}
                        onChange={(val) => setFormData({ ...formData, budget: val })}
                        icon={<LuGem className="text-blue-500" size={18} />}
                        disabled={isSubmitting}
                    />
                </ModernInputContainer>

                {/* Time & Date */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-[#1a1a1a] text-sm font-black min-w-[50px]">Time :</label>
                        <TimePicker
                            value={formData.time}
                            onChange={(newTime) => setFormData({ ...formData, time: newTime })}
                            slots={{ openPickerIcon: LuClock }}
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
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-[#1a1a1a] text-sm font-black min-w-[50px]">Date :</label>
                        <DatePicker
                            value={formData.date}
                            onChange={(newDate) => setFormData({ ...formData, date: newDate })}
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
                    </div>
                </div>

                {/* Vs Section */}
                <div className="pt-4">
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Vs (optional)</span>
                        <div className="h-[1px] w-full bg-gray-100" />
                    </div>
                    <div className="space-y-4 px-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[#1a1a1a]/60 text-xs font-black uppercase tracking-wide">Your ID:</label>
                            <ModernInput
                                type="text"
                                value={formData.yourId}
                                onChange={(e) => setFormData({ ...formData, yourId: e.target.value })}
                                className="!w-3/5 !py-2 !text-sm"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-[#1a1a1a]/60 text-xs font-black uppercase tracking-wide">Opponent ID:</label>
                            <ModernInput
                                type="text"
                                value={formData.opponentId}
                                onChange={(e) => setFormData({ ...formData, opponentId: e.target.value })}
                                className="!w-3/5 !py-2 !text-sm"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-4 px-1">
                    <p className="text-gray-400 font-black uppercase tracking-widest">Created By = Automatic</p>
                    <p className="text-gray-400 font-black uppercase tracking-widest">Automatic</p>
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
                        <span>Apply Now</span>
                    )}
                </Button>
                <p className="text-gray-400 text-[13px] font-black italic tracking-wide">Apply more event & Win Scratch Card</p>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForEventModal;

