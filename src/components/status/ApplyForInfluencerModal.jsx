import React, { useState } from 'react';
import { LuCalendar, LuSmartphone, LuGlobe, LuInstagram, LuChevronDown } from 'react-icons/lu';
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

const ApplyForInfluencerModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: 'bütťĕřfłÿ',
        entryDate: dayjs('2024-04-24'),
        whatsapp: '+919882134266',
        country: 'India',
        gender: 'Female',
        socialMediaId: 'bütťĕřfłÿ',
        instagramFollowers: '',
        instagramLink: 'Joya.live',
        verificationStatus: 'Yes',
        addedBy: 'Admin'
    });

    const countryOptions = [
        { value: 'India', label: 'India', icon: <span>🇮🇳</span> },
        { value: 'USA', label: 'USA', icon: <span>🇺🇸</span> },
        { value: 'UAE', label: 'UAE', icon: <span>🇦🇪</span> }
    ];

    const genderOptions = [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' }
    ];

    const instagramOptions = [
        { value: 'Joya.live', label: 'Joya.live' },
        { value: 'Solo', label: 'Solo' }
    ];

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Influencer"
        >
            <ModernFormSection>
                {/* Name */}
                <ModernInputContainer label="Name">
                    <ModernInput
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </ModernInputContainer>

                {/* Entry Date */}
                <ModernInputContainer label="Entry Date">
                    <DatePicker
                        value={formData.entryDate}
                        onChange={(newDate) => setFormData({ ...formData, entryDate: newDate })}
                        slots={{ openPickerIcon: LuCalendar }}
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
                        />
                    </div>
                </ModernInputContainer>

                {/* Country & Gender */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Select Country">
                        <ModernSelect
                            value={formData.country}
                            options={countryOptions}
                            onChange={(val) => setFormData({ ...formData, country: val })}
                            leftIconExtra={countryOptions.find(opt => opt.value === formData.country)?.icon}
                        />
                    </ModernInputContainer>
                    <ModernInputContainer label="Gender">
                        <ModernSelect
                            value={formData.gender}
                            options={genderOptions}
                            onChange={(val) => setFormData({ ...formData, gender: val })}
                        />
                    </ModernInputContainer>
                </div>

                {/* Social Media ID */}
                <ModernInputContainer label="Social Media ID">
                    <ModernInput
                        type="text"
                        value={formData.socialMediaId}
                        onChange={(e) => setFormData({ ...formData, socialMediaId: e.target.value })}
                    />
                </ModernInputContainer>

                {/* Instagram Followers */}
                <ModernInputContainer label="Instagram Followers">
                    <ModernInput
                        type="text"
                        value={formData.instagramFollowers}
                        onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                        placeholder="Enter count"
                    />
                </ModernInputContainer>

                {/* Instagram Link */}
                <ModernInputContainer label="Instagram Link">
                    <ModernSelect
                        value={formData.instagramLink}
                        options={instagramOptions}
                        onChange={(val) => setFormData({ ...formData, instagramLink: val })}
                        className="w-full"
                    />
                </ModernInputContainer>

                {/* Verification Status & Added By */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[#1a1a1a]/60 text-sm font-black">Verification Status</label>
                        <span className="text-[#1a1a1a] font-medium text-sm font-black">Yes</span>
                    </div>
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[#1a1a1a]/60 text-sm font-black">Added By</label>
                        <span className="text-[#1a1a1a] font-medium text-sm font-black">Admin</span>
                    </div>
                </div>
            </ModernFormSection>

            <div className="space-y-5 pt-8 pb-4 text-center px-4">
                <Button
                    variant="primary"
                    className="w-full py-4"
                    onClick={onClose}
                >
                    Apply
                </Button>
                <p className="text-gray-400 text-[13px] font-black italic tracking-wide">Apply more event & Win Scratch Card</p>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForInfluencerModal;
