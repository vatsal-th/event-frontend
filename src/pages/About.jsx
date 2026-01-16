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
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 min-h-[500px] flex items-center border-b border-purple-50/50">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 px-6 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                                    About Us
                                </h1>
                                <p className="text-gray-600 text-lg md:text-xl font-bold uppercase tracking-[0.2em]">
                                    Learn More About Rajput Entertainment Hub!
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-[32px] shadow-xl space-y-4 max-w-2xl mx-auto lg:mx-0">
                                <h2 className="text-2xl font-black text-gray-900">Welcome to Rajput Entertainment Hub!</h2>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    At Rajput Entertainment Hub, we're dedicated to helping you achieve success in the exciting world of live streaming and content creation. Based in India, we provide a secure and dynamic platform for hosts, influencers, and agencies to thrive and prosper.
                                </p>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="relative z-10 w-full max-w-lg mx-auto">
                                <img
                                    src="https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=800"
                                    className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl"
                                    alt="About Creator"
                                />
                                {/* Floating Badges */}
                                <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-2xl animate-bounce duration-[3000ms]">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                            <LuGlobe size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Live In</p>
                                            <p className="text-sm font-bold text-gray-900">PAN India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200/30 blur-[100px] rounded-full -z-10" />
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-200/30 blur-[100px] rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our Mission</h2>
                        <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">Empowering Creators Across India</p>
                        <p className="max-w-3xl mx-auto text-gray-600 font-medium leading-relaxed">
                            Our mission is to empower hosts and influencers across India by providing them with the tools, training and support they need to succeed in the live streaming industry.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-lg font-bold text-gray-700 mb-3">{stat.label}</p>
                                <p className="text-gray-500 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Why Choose Us?</h2>
                        <p className="text-lg font-bold text-gray-500 uppercase tracking-[0.2em]">Learn How to Work – Step by Step</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-black text-gray-900">{feature.title}</h4>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
