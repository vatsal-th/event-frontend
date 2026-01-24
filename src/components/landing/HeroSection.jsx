import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuUsers, LuTrendingUp, LuDollarSign } from 'react-icons/lu';
import Button from '../common/Button';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white z-0"></div>

            {/* Abstract Shapes */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-[80px]"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-purple-100 rounded-full shadow-sm mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-semibold text-gray-600">Now Recruiting New Talent</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Passion</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Profession</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100">
                        Join India's fastest growing creator management agency. We help you grow, monetize, and succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        <Button
                            variant="primary"
                            className="w-full sm:w-auto px-8 py-4 text-lg h-auto shadow-xl shadow-purple-200 hover:shadow-purple-300 transition-all hover:scale-105"
                            onClick={() => navigate('/login')}
                        >
                            Get Started Now
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto px-8 py-4 text-lg h-auto flex items-center justify-center space-x-2 border-2"
                            onClick={() => navigate('/about')}
                        >
                            <LuPlay size={20} className="fill-current" />
                            <span>Watch Demo</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                    {[
                        { value: '10K+', label: 'Active Creators', icon: <LuUsers className="text-purple-600" /> },
                        { value: '₹2Cr+', label: 'Paid to Creators', icon: <LuDollarSign className="text-green-600" /> },
                        { value: '500+', label: 'Partner Brands', icon: <LuTrendingUp className="text-blue-600" /> },
                        { value: '24/7', label: 'Support System', icon: <LuPlay className="text-pink-600" /> },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mb-4 mx-auto">
                                {React.cloneElement(stat.icon, { size: 24 })}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
