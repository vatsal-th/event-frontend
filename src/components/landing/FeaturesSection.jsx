import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: 'Live Hosting',
                            desc: 'Go live on top platforms and start earning from day one with our guidance.',
                            image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            title: 'Influencer Marketing',
                            desc: 'Connect with premium brands for sponsorship and collaboration opportunities.',
                            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            title: 'Agency Support',
                            desc: 'Build your own sub-agency and earn passive income from your network.',
                            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 mb-6">{feature.desc}</p>
                                <div className="flex items-center font-bold text-brand-purple group-hover:translate-x-2 transition-transform">
                                    Learn More <LuChevronRight />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
