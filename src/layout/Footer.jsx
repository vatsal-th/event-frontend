import React from 'react';
import { LuPhone, LuMapPin } from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand/Logo Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                                <span className="text-xl font-bold italic text-white">R</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">RAJPUT <span className="block text-xs font-normal text-gray-400">ENTERTAINMENT HUB</span></h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            India's fastest growing network for live streamers and creators. Empowering global talent since 2024.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><a href="/" className="hover:text-brand-purple transition-colors">Home</a></li>
                            <li><a href="/services" className="hover:text-brand-purple transition-colors">Services</a></li>
                            <li><a href="/apply-agency" className="hover:text-brand-purple transition-colors">Apply for Agency</a></li>
                            <li><a href="/apply-event" className="hover:text-brand-purple transition-colors">Apply for Event</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h3>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li className="flex items-center space-x-3">
                                <LuPhone size={16} className="text-brand-purple" />
                                <span>+91 12344 567 890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <LuMapPin size={16} className="text-brand-purple" />
                                <span>105 Street, Your City, State 1234</span>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Connect</h3>
                        <div className="flex space-x-4">
                            {[
                                { Icon: FaFacebook, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", border: "border-[#1877F2]/20", hover: "hover:bg-[#1877F2] hover:text-white" },
                                { Icon: FaInstagram, color: "text-[#E4405F]", bg: "bg-[#E4405F]/10", border: "border-[#E4405F]/20", hover: "hover:bg-[#E4405F] hover:text-white" },
                                { Icon: FaTwitter, color: "text-[#1DA1F2]", bg: "bg-[#1DA1F2]/10", border: "border-[#1DA1F2]/20", hover: "hover:bg-[#1DA1F2] hover:text-white" },
                                { Icon: FaYoutube, color: "text-[#FF0000]", bg: "bg-[#FF0000]/10", border: "border-[#FF0000]/20", hover: "hover:bg-[#FF0000] hover:text-white" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className={`w-10 h-10 rounded-lg ${social.bg} border ${social.border} flex items-center justify-center ${social.color} ${social.hover} shadow-sm transition-all duration-300 cursor-pointer active:scale-95`}
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                    <p>© 2026 Rajput Entertainment Hub. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
