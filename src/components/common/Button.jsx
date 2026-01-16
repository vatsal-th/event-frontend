import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer";

    const variants = {
        primary: "bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-purple-200",
        secondary: "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-100",
        whatsapp: "bg-[#128C7E] hover:bg-[#128C7E] text-white shadow-lg shadow-green-100",
        outline: "border-2 border-gray-200 hover:border-brand-purple hover:text-brand-purple text-gray-600",
        ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
        white: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-100 shadow-sm"
    };

    const sizes = {
        sm: "px-5 py-2 text-sm",
        md: "px-8 py-3 text-base",
        lg: "px-10 py-4 text-lg"
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], sizes[props.size || 'md'], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
