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
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 min-h-[420px] flex items-center border-b border-purple-50/50">
                {/* Soft Background Sparkles/Glows */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/30 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200/30 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white text-[10px] font-black uppercase tracking-widest text-brand-dark-purple">
                                    Training Center
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                                    Training & <br className="hidden lg:block" /> Tutorials
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
                                    Learn the platform, boost performance, and master your workflow.
                                </p>
                            </div>

                            <div className="max-w-[360px] space-y-3 mx-auto lg:mx-0">
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

                        <div className="hidden lg:flex justify-center items-center relative">
                            <div className="w-[320px] h-[320px] rounded-[32px] bg-white/60 backdrop-blur-xl border border-white shadow-lg flex items-center justify-center">
                                <div className="w-40 h-40 bg-violet-200/30 blur-[60px] rounded-full animate-pulse" />
                                <div className="absolute bottom-6 right-6 bg-white/80 border border-white rounded-2xl px-4 py-3 shadow-md">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-500">Total Tutorials</p>
                                    <p className="text-2xl font-black text-gray-900">{tutorials.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tutorials Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
                <div className="flex items-end justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Tutorial Library</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Pick a topic and start learning</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {tutorials.map((item, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-gray-100"
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors">
                                    <div className="w-14 h-14 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                                            <LuPlay size={20} fill="currentColor" className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-[10px] font-black text-gray-700 shadow-sm">
                                    {item.duration}
                                </div>
                            </div>

                            <div className="px-5 py-5 bg-white flex flex-col text-left space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-purple/80 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight group-hover:text-brand-purple transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <span>HD Video</span>
                                    <span>Watch Now</span>
                                </div>
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
