import React from 'react';
import { LuZap, LuGlobe, LuShield, LuStar, LuUsers, LuCheck } from 'react-icons/lu';

const WhyChooseUsSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-brand-purple font-bold tracking-wider uppercase text-sm">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 mb-6">Built for Creator Success</h2>
                    <p className="text-gray-500 text-lg">We provide the tools, support, and network you need to turn your talent into a thriving career.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'Instant Withdrawals', desc: 'Get paid instantly. No waiting periods for your hard-earned money.', icon: <LuZap className="text-yellow-500" /> },
                        { title: 'Global Exposure', desc: 'Connect with audiences worldwide and expand your reach beyond borders.', icon: <LuGlobe className="text-blue-500" /> },
                        { title: 'Premium Support', desc: 'Dedicated account managers available 24/7 to help you grow.', icon: <LuShield className="text-green-500" /> },
                        { title: 'Brand Deals', desc: 'Direct access to top brands looking for influencers like you.', icon: <LuStar className="text-purple-500" /> },
                        { title: 'Training Academy', desc: 'Exclusive access to our creator training and mentorship programs.', icon: <LuUsers className="text-pink-500" /> },
                        { title: 'Secure Platform', desc: 'Enterprise-grade security to keep your account and earnings safe.', icon: <LuCheck className="text-indigo-500" /> },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                                {React.cloneElement(item.icon, { size: 24 })}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
