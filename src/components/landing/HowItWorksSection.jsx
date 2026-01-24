import React from 'react';

const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">How It Works</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Start your journey to stardom in 3 simple steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-30"></div>

                    {[
                        { step: '01', title: 'Sign Up', desc: 'Create your free account and complete your profile details.' },
                        { step: '02', title: 'Get Verified', desc: 'Complete our simple verification process to unlock all features.' },
                        { step: '03', title: 'Start Earning', desc: 'Go live, connect with brands, and watch your earnings grow.' },
                    ].map((item, idx) => (
                        <div key={idx} className="relative text-center group">
                            <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-brand-purple transition-colors duration-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <span className="text-3xl font-black text-white">{item.step}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
