import React from 'react';
import { LuQuote } from 'react-icons/lu';

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-purple-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Creator Stories</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Hear from creators who have transformed their lives with us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: 'Priya Sharma', role: 'Live Host', quote: 'I never thought I could make a living from streaming. This agency changed everything for me!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
                        { name: 'Rahul Verma', role: 'Influencer', quote: 'The brand deals I get through this platform are amazing. Professional support all the way.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
                        { name: 'Anjali Singh', role: 'Content Creator', quote: 'Fastest withdrawals and the best community. I highly recommend joining if you have talent.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 italic relative">
                            <LuQuote className="absolute top-6 right-6 text-purple-100" size={48} />
                            <p className="text-gray-600 mb-6 relative z-10 leading-relaxed">"{item.quote}"</p>
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                    <p className="text-xs text-brand-purple font-semibold uppercase">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
