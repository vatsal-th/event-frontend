import React, { useState } from 'react';
import { LuPlay, LuUsers, LuWallet, LuSettings, LuUserPlus, LuGamepad2, LuSearch } from 'react-icons/lu';
import { Select } from '../components/common/Forms';

const Training = () => {
    const [selectedApp, setSelectedApp] = useState('joyo');

    const apps = [
        { label: 'Joyo', value: 'joyo', color: 'bg-purple-500' },
        { label: 'Tango', value: 'tango', color: 'bg-gray-400' },
        { label: 'Poppo', value: 'poppo', color: 'bg-red-500' },
        { label: 'Skout', value: 'skout', color: 'bg-cyan-400' },
        { label: 'Any Other App', value: 'other', color: 'bg-gray-300' }
    ];

    const tutorials = [
        {
            title: 'Registration & Profile Setup',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
            duration: '05:20',
            icon: <LuUserPlus className="text-white" size={24} />
        },
        {
            title: 'Host Training',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
            duration: '08:45',
            icon: <LuUsers className="text-white" size={24} />
        },
        {
            title: 'Influencer Training',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
            duration: '06:15',
            icon: <LuSearch className="text-white" size={24} />
        },
        {
            title: 'Agency Training',
            image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800',
            duration: '10:30',
            icon: <LuSettings className="text-white" size={24} />
        },
        {
            title: 'Wallet & Scratch Card Training',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
            duration: '04:50',
            icon: <LuWallet className="text-white" size={24} />
        },
        {
            title: 'Withdrawal & Rules Training',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            duration: '07:12',
            icon: <LuClock className="text-white" size={24} />
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section - Matched with Home.jsx style */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 min-h-[500px] flex items-center border-b border-purple-50/50">
                {/* Soft Background Sparkles/Glows */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                    {/* Nebula Glows */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/30 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200/30 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                        {/* Left Content - Preserved from Training but styled for new layout */}
                        <div className="space-y-10 text-center lg:text-left">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                                    Training & <br className="hidden lg:block" /> Tutorials
                                </h1>
                                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs lg:text-sm">
                                    Master your platform experience
                                </p>
                            </div>

                            {/* App Selector - Preserved */}
                            <div className="max-w-[320px] space-y-3 mx-auto lg:mx-0">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Select App for Training
                                </label>
                                <Select
                                    value={selectedApp}
                                    onChange={setSelectedApp}
                                    options={apps}
                                    placeholder="Select App"
                                    className="!bg-white !border-gray-100 !rounded-2xl shadow-sm hover:shadow-md transition-all !py-3"
                                />
                            </div>
                        </div>

                        {/* Right Content - Empty or could have a subtle graphic like Home.jsx */}
                        <div className="hidden lg:flex justify-center items-center relative">
                            <div className="w-64 h-64 bg-violet-200/20 blur-[80px] rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Tutorials Grid - Refined Card UI with more spacing */}
            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tutorials.map((item, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
                        >
                            {/* Thumbnail container */}
                            <div className="relative aspect-video">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700"
                                />
                                {/* Play button overlay - Centered & Premium */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                                            <LuPlay size={24} fill="currentColor" className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title Bar at the bottom */}
                            <div className="px-4 py-6 bg-white flex flex-col items-left text-left">
                                <h3 className="text-xl font-black font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-brand-purple transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Placeholder icon for LuClock which might be missing in some versions
const LuClock = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"   
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default Training;
