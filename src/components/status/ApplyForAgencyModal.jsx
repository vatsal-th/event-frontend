import React, { useState } from 'react';
import { LuBuilding2, LuChevronDown } from 'react-icons/lu';
import Button from '../common/Button';
import {
    ModernModalLayout,
    ModernFormSection,
    ModernInputContainer,
    ModernInput,
    ModernSelect
} from '../common/ModernModal';

const ApplyForAgencyModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: 'Divya',
        mobile: '+91 7082000736',
        country: 'India',
        gender: 'Female',
        agencyName: 'Kargil agrnency',
        minHost: '10 Active',
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

    const minHostOptions = [
        { value: '10 Active', label: '10 Active' },
        { value: '20 Active', label: '20 Active' },
        { value: '50 Active', label: '50 Active' }
    ];

    const appOptions = [
        { value: 'Joyo Live', label: 'Joyo Live' },
        { value: 'Solo Live', label: 'Solo Live' }
    ];

    return (
        <ModernModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Apply for Agency"
            HeaderIcon={LuBuilding2}
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

                {/* Agency Name */}
                <ModernInputContainer label="Agency Name">
                    <ModernInput
                        type="text"
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        placeholder="Enter agency name"
                    />
                </ModernInputContainer>

                {/* Minimum Host Requirement */}
                <ModernInputContainer label="Minmum Host Requirement">
                    <ModernSelect
                        value={formData.minHost}
                        options={minHostOptions}
                        onChange={(val) => setFormData({ ...formData, minHost: val })}
                        rightLabel={<span className="text-gray-400 font-medium">!active</span>}
                    />
                </ModernInputContainer>

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
                        <span className="text-[#1a1a1a]/70 text-xs font-black uppercase">Automatic vol</span>
                    </div>
                </div>
            </ModernFormSection>

            <div className="space-y-5 pt-8 pb-4 text-center px-4">
                <Button
                    variant="primary"
                    className="w-full +py-4 rounded-[20px] text-lg"
                    onClick={onClose}
                >
                    Apply
                </Button>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForAgencyModal;
