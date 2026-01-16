import React from 'react';
import { LuSmartphone, LuUsers, LuMic, LuStar, LuGift, LuShare2, LuWallet } from 'react-icons/lu';
import Button from '../components/common/Button';

const Home = () => {
    const categories = [
        {
            title: 'Apply for Hosting',
            desc: 'Become a live host & earn',
            icon: <LuMic className="text-purple-600" />,
            action: 'Apply Now',
            color: 'bg-purple-50'
        },
        {
            title: 'Apply for Event',
            desc: 'Host or join events',
            icon: <LuStar className="text-blue-600" />,
            action: 'Apply Now',
            color: 'bg-blue-50'
        },
        {
            title: 'Apply for Agency',
            desc: 'Start your own agency',
            icon: <LuUsers className="text-indigo-600" />,
            action: 'Apply Now',
            color: 'bg-indigo-50'
        },
        {
            title: 'Top Up For User',
            desc: 'Recharge wallet & buy cods',
            icon: <LuWallet className="text-orange-600" />,
            action: 'Top Up Now',
            color: 'bg-orange-50',
            btnVariant: 'secondary'
        },
        {
            title: 'Apply for User',
            desc: 'Recharge wallet & buy coins easily',
            icon: <LuWallet className="text-violet-600" />,
            action: 'Apply Now',
            color: 'bg-violet-50'
        },
        {
            title: 'Apply for Influencers',
            desc: 'Reach brands as influencer',
            icon: <LuShare2 className="text-pink-600" />,
            action: 'Apply Now',
            color: 'bg-pink-50'
        },
        {
            title: 'Invite Friends & Earn Rewards',
            desc: 'Invite friends & earn rewards',
            icon: <LuGift className="text-emerald-600" />,
            action: 'Invite Now',
            color: 'bg-emerald-50',
            isWide: true
        },
    ];

    return (
        <div className="space-y-24 mb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 min-h-[500px] flex items-center border-b border-purple-50/50">
                {/* Soft Background Sparkles */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 md:p-16 lg:px-8 lg:py-20">
                    {/* Left Content */}
                    <div className="space-y-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                            India's Growing Live Streaming & Creator Agency
                        </h1>

                        <p className="text-gray-600/80 text-lg md:text-xl font-medium leading-relaxed">
                            Join the fun, go live, grow your audience & earn from your talent
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                            <Button variant="primary" className="px-10 py-4 text-lg shadow-xl shadow-purple-200">
                                Join as Host
                            </Button>
                            <Button variant="whatsapp" className="px-10 py-4 text-lg flex items-center space-x-3">
                                <LuSmartphone size={24} />
                                <span>WhatsApp Now</span>
                            </Button>
                        </div>
                    </div>

                    {/* Right Image Container */}
                    <div className="relative h-full flex items-center justify-center">
                        {/* Creator Image */}
                        <div className="relative z-0 w-full max-w-md pointer-events-none lg:max-w-xl">
                            <img
                                src="https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=800"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                alt="Creator with Ring Light"
                                onLoad={(e) => { e.target.style.opacity = 1 }}
                                style={{ opacity: 0, transition: 'opacity 0.5s' }}
                            />
                            {/* Glassmorphism Wallet Card - Floating */}
                            <div className="absolute top-0 right-0 lg:-top-5 lg:-right-4 bg-white/40 backdrop-blur-xl border border-white/40 p-5 rounded-3xl shadow-2xl flex items-center space-x-5 animate-in fade-in slide-in-from-right-10 duration-1000 cursor-pointer pointer-events-auto hover:bg-white/50 transition-colors">
                                <div className="w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center shadow-inner">
                                    <LuWallet size={32} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-purple-900/60 font-black uppercase tracking-wider">Wallet Balance:</p>
                                    <p className="text-2xl font-black text-gray-900">732 Points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">Our Services</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Choose the right path for your talent and start growing with us today.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className={`group bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-brand-purple/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.1)] transition-all duration-500 flex flex-col justify-between cursor-pointer ${cat.isWide ? 'lg:col-span-1' : ''}`}
                        >
                            <div className="space-y-6">
                                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    {React.cloneElement(cat.icon, { size: 32 })}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{cat.desc}</p>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    variant={cat.btnVariant === 'secondary' ? 'secondary' : 'primary'}
                                    className="w-full"
                                >
                                    {cat.action}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Float WhatsApp */}
            <div className="fixed bottom-10 right-10 z-50">
                <a href="#" className="flex items-center space-x-3 bg-[#25D366] text-white pr-6 pl-2 py-2 rounded-full shadow-2xl hover:scale-105 transition-transform group">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:animate-pulse">
                        <LuSmartphone size={24} />
                    </div>
                    <span className="font-bold">Chat with us</span>
                </a>
            </div>
        </div>
    );
};

export default Home;
