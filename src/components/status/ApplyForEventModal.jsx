import React, { useState } from 'react';
import { LuCalendar, LuClock, LuGem } from 'react-icons/lu';
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

const ApplyForEventModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: 'Divya',
        mobile: '+91 7082000736',
        country: 'India',
        gender: 'Female',
        agencyCode: '14455',
        budget: '10 lcs Diamond',
        eventName: 'Joyo Live',
        time: dayjs(),
        date: dayjs(),
        yourId: '',
        opponentId: ''
    });

    const countryOptions = [
        { value: 'India', label: 'India', icon: <span>🇮🇳</span> },
        { value: 'USA', label: 'USA', icon: <span>🇺🇸</span> },
        { value: 'UK', label: 'UK', icon: <span>🇬🇧</span> },
        { value: 'UAE', label: 'UAE', icon: <span>🇦🇪</span> },
        { value: 'Pakistan', label: 'Pakistan', icon: <span>🇵🇰</span> }
    ];

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
        }
    ];

    const eventOptions = [
        {
            value: 'Joyo Live',
            label: <div className="flex justify-between items-center w-full pr-2"><span>Joyo Live</span> <span className="text-[11px] font-black text-gray-400 ml-4">1,917,120</span></div>
        },
        {
            value: 'Solo PK',
            label: <div className="flex justify-between items-center w-full pr-2"><span>Solo PK</span> <span className="text-[11px] font-black text-gray-400 ml-4">1,000,000</span></div>
        },
        {
            value: 'Multi Live',
            label: <div className="flex justify-between items-center w-full pr-2"><span>Multi Live</span> <span className="text-[11px] font-black text-gray-400 ml-4">2,500,000</span></div>
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
                {/* Name */}
                <ModernInputContainer label="Name">
                    <ModernInput
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
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

                {/* Agency Code */}
                <ModernInputContainer label="Agency Code">
                    <ModernInput
                        type="text"
                        value={formData.agencyCode}
                        onChange={(e) => setFormData({ ...formData, agencyCode: e.target.value })}
                        placeholder="Enter agency code"
                    />
                </ModernInputContainer>

                {/* Budget */}
                <ModernInputContainer label="Budget">
                    <ModernSelect
                        value={formData.budget}
                        options={budgetOptions}
                        onChange={(val) => setFormData({ ...formData, budget: val })}
                        icon={<LuGem className="text-blue-500" size={18} />}
                    />
                </ModernInputContainer>

                {/* Event Name */}
                <ModernInputContainer label="Event Name" rightLabel="Joyo PK">
                    <ModernSelect
                        value={formData.eventName}
                        options={eventOptions}
                        onChange={(val) => setFormData({ ...formData, eventName: val })}
                        icon={<LuGem className="text-blue-500" size={18} />}
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
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-[#1a1a1a]/60 text-xs font-black uppercase tracking-wide">Opponent ID:</label>
                            <ModernInput
                                type="text"
                                value={formData.opponentId}
                                onChange={(e) => setFormData({ ...formData, opponentId: e.target.value })}
                                className="!w-3/5 !py-2 !text-sm"
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
                    className="w-full py-4 rounded-[20px] text-lg"
                    onClick={onClose}
                >
                    Apply Now
                </Button>
                <p className="text-gray-400 text-[13px] font-black italic tracking-wide">Apply more event & Win Scratch Card</p>
            </div>
        </ModernModalLayout>
    );
};

export default ApplyForEventModal;
