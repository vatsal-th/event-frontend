import React, { useEffect, useRef } from 'react';
import { LuX, LuChevronDown, LuTrophy, LuGem, LuCheck } from 'react-icons/lu';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/**
 * ModernModalLayout
 * Wraps the modal content with premium responsiveness for mobile and desktop.
 */
export const ModernModalLayout = ({ isOpen, onClose, title, id, children, HeaderIcon }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const Icon = HeaderIcon || LuTrophy;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-[480px] max-h-[92vh] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] flex flex-col animate-in zoom-in-95 fade-in duration-300">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 sm:p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-[#1a1a1a] transition-all cursor-pointer z-20 shadow-sm"
                    >
                        <LuX size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    {/* Header Section */}
                    <div className="relative pt-8 sm:pt-12 pb-4 sm:pb-6anti px-4 sm:px-6 text-center shrink-0">
                        <div className="flex items-end justify-center space-x-2 mb-3 sm:mb-4">
                            <Icon className="text-orange-400 w-5 h-5 sm:w-6 sm:h-6" />
                            <div className="relative">
                                <Icon className="text-orange-500 w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <Icon className="text-orange-400 w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        <div className="space-y-1">
                            {id && <p className="text-gray-400 text-[11px] sm:text-[13px] font-black tracking-widest uppercase">ID : {id}</p>}
                            <h2 className="text-[22px] sm:text-[28px] font-black text-[#1a1a1a] leading-tight px-4">{title}</h2>
                        </div>
                    </div>

                    {/* Content Section (Scrollable) */}
                    <div className="relative px-3 sm:px-6 pb-8 sm:pb-12 flex-1 overflow-y-auto custom-scrollbar">
                        {children}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(0, 0, 0, 0.08);
                            border-radius: 10px;
                        }
                    `}} />
                </div>
            </div>
        </LocalizationProvider>
    );
};

/**
 * ModernFormSection
 * Standard container for form fields, adjusted padding for mobile.
 */
export const ModernFormSection = ({ children, className = "" }) => (
    <div className={`bg-[#fbfcff] rounded-[24px] sm:rounded-[32px] border border-purple-50 p-4 sm:p-6 space-y-4 sm:y-5 ${className}`}>
        {children}
    </div>
);

/**
 * ModernInputContainer
 * Standard wrapper for a label and its input.
 */
export const ModernInputContainer = ({ label, required, children, className = "", rightLabel }) => (
    <div className={className}>
        <div className="flex justify-between items-end mb-1 sm:mb-1.5 px-1">
            <label className="text-[#1a1a1a] text-[12px] sm:text-sm font-black block">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {rightLabel && <span className="text-gray-400 text-[9px] sm:text-[11px] font-black pb-0.5 uppercase tracking-wider">{rightLabel}</span>}
        </div>
        {children}
    </div>
);

/**
 * ModernInput
 * Base input field styled for the modal system.
 */
export const ModernInput = ({ ...props }) => (
    <input
        {...props}
        className={`w-full bg-[#f3efff] border border-white/60 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[#1a1a1a] text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-400/30 shadow-sm transition-all ${props.className || ''}`}
    />
);

/**
 * ModernSelect
 * Custom dropdown component with optimized mobile interaction.
 */
export const ModernSelect = ({ value, options, onChange, icon, leftIconExtra, className = "" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#f3efff] border border-white/60 rounded-xl pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 text-[#1a1a1a] text-sm sm:text-base font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400/30 shadow-sm flex items-center justify-between group transition-all"
            >
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center pr-2 border-r border-[#1a1a1a]/10">
                    {leftIconExtra ? leftIconExtra : icon}
                </div>
                <span className="text-xs sm:text-sm truncate pr-2">
                    {selectedOption?.label}
                </span>
                <LuChevronDown
                    className={`text-[#1a1a1a]/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={16}
                />
            </div>

            {isOpen && (
                <div className="absolute z-[110] w-full mt-2 bg-white border border-purple-100 rounded-xl sm:rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 sm:px-4 py-2 sm:py-2.5 mx-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${value === option.value
                                ? 'bg-[#8B5CF6] text-white'
                                : 'text-[#1a1a1a] hover:bg-purple-50'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {option.icon && option.icon}
                                {option.label}
                            </span>
                            {value === option.value && <LuCheck size={14} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Picker Styles Helper - Optimized for mobile touch
 */
export const getModernPickerStyles = (fullWidth = true) => ({
    '& .MuiInputBase-root': {
        backgroundColor: '#f3efff',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        fontSize: '13px',
        fontWeight: '700',
        fontFamily: 'inherit',
        height: '44px',
        width: fullWidth ? '100%' : 'auto',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee9ff',
        }
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiInputBase-input': {
        padding: '10px 14px',
        color: '#1a1a1a',
        fontWeight: '700',
        cursor: 'pointer',
    },
    '& .MuiInputAdornment-root': {
        marginLeft: 0,
        marginRight: '6px',
    }
});
