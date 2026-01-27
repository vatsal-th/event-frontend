import React, { useState } from 'react';
import { LuMic } from 'react-icons/lu';
import Button from '../common/Button';
import {
    ModernModalLayout,
    ModernFormSection,
    ModernInputContainer,
    ModernInput,
    ModernSelect
} from '../common/ModernModal';

const ApplyForHostingModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: 'Divya',
        mobile: '+91 7082000736',
        country: 'India',
        gender: 'Female',
        category: 'A',
        talent: 'Dancer',
        appName: 'Joyo Live'
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

    const categoryOptions = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' }
    ];

    const talentOptions = [
        { value: 'Dancer', label: 'Dancer' },
        { value: 'Singer', label: 'Singer' },
        { value: 'Chatter', label: 'Chatter' }
    ];

    const appOptions = [
        { value: 'Joyo Live', label: 'Joyo Live' },
        { value: 'Solo Live', label: 'Solo Live' }
    ];

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Hosting"
            HeaderIcon={LuMic}
        >
            <ModernFormSection>
                {/* Name */}
                <ModernInputContainer label="Name">
                    <ModernInput
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name"
                    />
                </ModernInputContainer>

                {/* Mobile Number */}
                <ModernInputContainer label="Mobile Number">
                    <ModernInput
                        type="text"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="Enter mobile number"
                    />
                </ModernInputContainer>

                {/* Country & Gender */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Country">
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

                {/* Category & Talent */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <ModernInputContainer label="Category">
                        <ModernSelect
                            value={formData.category}
                            options={categoryOptions}
                            onChange={(val) => setFormData({ ...formData, category: val })}
                        />
                    </ModernInputContainer>
                    <ModernInputContainer label="Talent">
                        <ModernSelect
                            value={formData.talent}
                            options={talentOptions}
                            onChange={(val) => setFormData({ ...formData, talent: val })}
                        />
                    </ModernInputContainer>
                </div>

                {/* Apply For App Name */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pt-2">
                    <label className="text-[#1a1a1a]/80 text-sm font-black whitespace-nowrap px-1">Apply For App Name =</label>
                    <ModernSelect
                        value={formData.appName}
                        options={appOptions}
                        onChange={(val) => setFormData({ ...formData, appName: val })}
                        className="w-full"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-4 pt-4 px-1 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Inviter ID =</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black">1917120</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Created By =</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black">Automatic</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Date</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black">Automatic</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Inviter ID =</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black">1917120</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1a1a]/50 text-xs font-black">Created By =</label>
                        <span className="text-[#1a1a1a]/70 text-xs font-black uppercase">Automatic</span>
                    </div>
                </div>
            </ModernFormSection>

            <div className="space-y-5 pt-8 pb-4 text-center px-4">
                <Button
                    variant="primary"
                    className="w-full py-4 rounded-[20px] text-lg   "
                    onClick={onClose}
                >
                    Apply
                </Button>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForHostingModal;
