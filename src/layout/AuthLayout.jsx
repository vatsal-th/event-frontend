import React from 'react';
import { LuInfo, LuCheck } from 'react-icons/lu';

const AuthLayout = ({ title, subtitle, error, success, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 intro-y">
            <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 mb-4 transform transition-transform hover:scale-110 duration-300">
                        <span className="text-2xl font-bold italic text-white">R</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {subtitle}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center space-x-2 text-sm animate-in fade-in slide-in-from-top-2">
                        <LuInfo size={18} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center space-x-2 text-sm animate-in fade-in slide-in-from-top-2">
                        <LuCheck size={18} className="shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
