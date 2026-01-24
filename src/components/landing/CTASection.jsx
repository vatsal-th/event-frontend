import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="bg-brand-purple rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-10 rounded-full -translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">Ready to Start Your Journey?</h2>
                    <p className="text-purple-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">Join thousands of creators who are living their dream. Sign up today and get a welcome bonus!</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-10 py-5 bg-white text-brand-purple text-lg font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-lg"
                        >
                            creating account
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-2xl hover:bg-white/10 transition-colors"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
