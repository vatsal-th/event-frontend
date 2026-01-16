import React, { useState } from 'react';
import { clsx } from 'clsx';
import { LuChevronDown, LuCheck } from 'react-icons/lu';
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Premium Styled MUI Select
const StyledMuiSelect = styled(MuiSelect)(({ theme }) => ({
    '&.MuiInputBase-root': {
        backgroundColor: '#F8FAFC',
        borderRadius: '16px',
        border: '1px solid #F1F5F9',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: '"Satoshi", sans-serif',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            backgroundColor: '#ffffff',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.05)',
        },
        '&.Mui-focused': {
            backgroundColor: '#ffffff',
            borderColor: 'rgba(139, 92, 246, 0.5)',
            boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.05), 0 20px 25px -5px rgba(139, 92, 246, 0.1)',
        },
    },
    '& .MuiSelect-select': {
        padding: '16px 20px',
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-icon': {
        right: '16px',
        color: '#94A3B8',
        transition: 'all 0.3s ease',
    },
    '&.Mui-focused .MuiSelect-icon': {
        color: '#8B5CF6',
        transform: 'rotate(180deg)',
    }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: '"Satoshi", sans-serif',
    padding: '12px 20px',
    margin: '4px 8px',
    borderRadius: '12px',
    color: '#475569',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        color: '#8B5CF6',
        transform: 'translateX(4px)',
    },
    '&.Mui-selected': {
        backgroundColor: '#8B5CF6 !important',
        color: '#ffffff',
        fontWeight: '700',
        boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
        '&:hover': {
            backgroundColor: '#7C3AED !important',
        },
    },
}));

export const Select = ({ label, options = [], error, className, value, onChange, placeholder = "Select option" }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                    {label}
                </label>
            )}
            <FormControl fullWidth error={!!error}>
                <StyledMuiSelect
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    displayEmpty
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span className="text-gray-400">{placeholder}</span>;
                        }
                        const found = options.find(opt => opt.value === selected);
                        return found ? found.label : selected;
                    }}
                    IconComponent={LuChevronDown}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                mt: '8px',
                                borderRadius: '24px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                padding: '8px 0',
                                '& .MuiList-root': {
                                    padding: '0',
                                },
                            },
                        },
                    }}
                >
                    {options.map((option) => (
                        <StyledMenuItem key={option.value} value={option.value}>
                            {option.label}
                        </StyledMenuItem>
                    ))}
                </StyledMuiSelect>
            </FormControl>
            {error && <p className="mt-2 ml-1 text-xs text-red-500 font-bold uppercase tracking-wider animate-pulse">{error}</p>}
        </div>
    );
};

export const Input = ({ label, error, className, ...props }) => {
    return (
        <div className="w-full group">
            {label && (
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                    {label}
                </label>
            )}
            <input
                className={clsx(
                    "w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-brand-purple/50 focus:bg-white transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/5",
                    error && "border-red-200 bg-red-50/30",
                    className
                )}
                {...props}
            />
            {error && <p className="mt-2 ml-1 text-xs text-red-500 font-bold uppercase tracking-wider animate-pulse">{error}</p>}
        </div>
    );
};

export const Textarea = ({ label, error, className, ...props }) => {
    return (
        <div className="w-full group">
            {label && (
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                    {label}
                </label>
            )}
            <textarea
                className={clsx(
                    "w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-brand-purple/50 focus:bg-white transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/5 shadow-sm min-h-[140px] resize-none",
                    error && "border-red-200 bg-red-50/30",
                    className
                )}
                {...props}
            />
            {error && <p className="mt-2 ml-1 text-xs text-red-500 font-bold uppercase tracking-wider animate-pulse">{error}</p>}
        </div>
    );
};

export const Checkbox = ({ label, className, ...props }) => {
    return (
        <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className={clsx(
                        "peer appearance-none w-5 h-5 rounded border border-gray-300 checked:bg-brand-purple checked:border-brand-purple focus:ring-2 focus:ring-purple-500/20 transition-all bg-white cursor-pointer",
                        className
                    )}
                    {...props}
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block left-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
        </label>
    );
};

export const Radio = ({ label, className, ...props }) => {
    return (
        <label className="flex items-center space-x-3 cursor-pointer group">
            <input
                type="radio"
                className={clsx(
                    "appearance-none w-5 h-5 rounded-full border border-gray-300 checked:border-[5px] checked:border-brand-purple focus:ring-2 focus:ring-purple-500/20 transition-all bg-white cursor-pointer",
                    className
                )}
                {...props}
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
        </label>
    );
};
