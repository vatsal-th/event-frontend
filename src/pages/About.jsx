import React from 'react';
import { LuUsers, LuShieldCheck, LuTrophy, LuHeadphones, LuRocket, LuGraduationCap, LuGift, LuGlobe } from 'react-icons/lu';

const About = () => {
    const stats = [
        {
            label: 'Trusted Users',
            value: '+2 Million',
            desc: 'Join a large, growing community of creators.',
            icon: <LuUsers size={32} className="text-purple-600" />,
            color: 'bg-purple-50'
        },
        {
            label: 'Rewards Given',
            value: '₹50 Crore',
            desc: 'Earn real rewards through scratch cards and points.',
            icon: <LuGift size={32} className="text-pink-600" />,
            color: 'bg-pink-50'
        },
        {
            label: 'Support & Guidance',
            value: '24/7 Support',
            desc: 'Our team is always here to assist you anytime.',
            icon: <LuHeadphones size={32} className="text-indigo-600" />,
            color: 'bg-indigo-50'
        }
    ];

    const features = [
        {
            title: 'Secure Platform',
            desc: 'Safe & reliable payouts and transactions.',
            icon: <LuShieldCheck size={28} className="text-purple-600" />
        },
        {
            title: 'Earn Real Rewards',
            desc: 'Top up wallets via scratch cards and points.',
            icon: <LuTrophy size={28} className="text-pink-600" />
        },
        {
            title: 'Expert Training',
            desc: 'Expert callers provide solutions on the spot.',
            icon: <LuGraduationCap size={28} className="text-indigo-600" />
        },
        {
            title: 'Growth Opportunities',
            desc: 'High earnings potential for all creators.',
            icon: <LuRocket size={28} className="text-emerald-600" />
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 border-b border-gray-100">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-5 text-center lg:text-left">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                About Us
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                                Rajput Entertainment Hub
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                We help hosts, influencers, and agencies succeed in live streaming with a secure platform,
                                clear guidance, and reliable support.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 text-left shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">Founded</p>
                                    <p className="text-lg font-black text-gray-900">2024</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 text-left shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">Coverage</p>
                                    <p className="text-lg font-black text-gray-900">Pan India</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-end">
                            <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=800"
                                    className="w-full h-auto object-contain rounded-2xl"
                                    alt="About Creator"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-10 sm:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">Our Mission</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-3xl mx-auto">
                            Empower creators with tools, training, and support to grow consistently in the live
                            streaming space.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-5`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                                <p className="text-sm font-bold text-gray-700 mt-1">{stat.label}</p>
                                <p className="text-gray-500 text-sm mt-3">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-10 sm:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">Why Choose Us</h2>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Clear processes, reliable payouts, and trusted guidance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-left">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-black text-gray-900">{feature.title}</h4>
                                <p className="text-gray-500 text-sm mt-2">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
