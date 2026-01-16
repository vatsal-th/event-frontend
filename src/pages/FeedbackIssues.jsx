import React, { useState } from 'react';
import { LuCloudUpload, LuMic, LuSettings } from 'react-icons/lu';
import { Input, Select, Textarea } from '../components/common/Forms';
import Button from '../components/common/Button';

const FeedbackIssues = () => {
    const [appId, setAppId] = useState('');
    const [complaintType, setComplaintType] = useState('');

    const grievances = [
        {
            id: '#GRV1012',
            title: 'Payment Issue',
            submitted: 'April 17, 2024',
            updated: 'April 17, 2024',
            status: 'Pending',
            statusType: 'pending',
            icon: <LuMic size={24} className="text-purple-500" />
        },
        {
            id: '#GRV1009',
            title: 'Technical Issue',
            submitted: 'April 15, 2024',
            updated: 'April 16, 2024',
            status: 'In Progress',
            statusType: 'progress',
            icon: <LuSettings size={24} className="text-blue-500" />
        },
        {
            id: '#GRV1007',
            title: 'Payment Issue',
            submitted: 'April 12, 2024',
            updated: 'April 15, 2024',
            status: 'Resolved',
            statusType: 'resolved',
            icon: <LuSettings size={24} className="text-emerald-500" />
        }
    ];

    const getStatusStyle = (type) => {
        switch (type) {
            case 'pending': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'progress': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'resolved': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700">
            {/* Header Banner */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 py-8 sm:py-12 md:py-16 lg:py-24 border-b border-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight px-2 sm:px-0">
                            Customer Grievance <br className="hidden sm:block" /> Handling
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                            We value your feedback. Please share your concerns so we can assist you effectively.
                        </p>
                    </div>
                    {/* Floating Creator Image - Placeholder matches the reference theme */}
                    <div className="hidden lg:flex justify-end">
                        <div className="relative w-full max-w-md">
                            <img
                                src="https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=800"
                                className="w-full h-auto object-contain drop-shadow-2xl rounded-[3rem] opacity-80"
                                alt="Support Representative"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                {/* Left: Issue Form */}
                <div className="space-y-6 sm:space-y-8 bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 md:p-10 rounded-[20px] shadow-sm">
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Issue Form: Let Us Help You</h2>
                        <p className="text-gray-500 text-xs sm:text-sm">Please fill out the form below to report any issues or grievances. Attach relevant files if needed.</p>
                    </div>

                    <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            <Input label="Name" placeholder="Enter your name" />
                            <Select
                                label="App ID"
                                value={appId}
                                onChange={setAppId}
                                options={[
                                    { label: 'Select App ID', value: '' },
                                    { label: '#12345678', value: '123' },
                                    { label: '#87654321', value: '321' }
                                ]}
                            />
                        </div>

                        <Select
                            label="Complaint Type"
                            value={complaintType}
                            onChange={setComplaintType}
                            options={[
                                { label: 'Select Complaint Type', value: '' },
                                { label: 'Payment Issue', value: 'payment' },
                                { label: 'Technical Issue', value: 'technical' },
                                { label: 'Account Issue', value: 'account' }
                            ]}
                        />

                        <Textarea label="Complaint" placeholder="Describe your issue in detail (up to 500 words)" />

                        {/* File Upload Area */}
                        <div className="group relative border-2 border-dashed border-gray-200 rounded-2xl p-6 sm:p-8 transition-all hover:border-brand-purple/40 hover:bg-purple-50/30 flex flex-col items-center justify-center space-y-3 cursor-pointer">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                                <LuCloudUpload size={20} className="sm:w-6 sm:h-6" />
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-gray-500 text-center px-2">
                                <span className="text-brand-purple">Drag & drop files here</span>, or Browse
                            </p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>

                        <Button variant="primary" className="w-full py-3 sm:py-4 text-base sm:text-lg shadow-xl shadow-purple-200">
                            Submit Complaint
                        </Button>
                    </form>
                </div>

                {/* Right: Status Tracker */}
                <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Track Your Grievance Status</h2>
                        <p className="text-gray-500 text-xs sm:text-sm">Monitor the status of your submitted grievances. Stay updated with real-time progress.</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {grievances.map((item, idx) => (
                            <div key={idx} className="group relative bg-[#F4F6F8] rounded-3xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                                    <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-none mb-1 break-words">
                                                {item.id} · {item.title}
                                            </h3>
                                            <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                                <span>Submitted: {item.submitted}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider border flex-shrink-0 ${getStatusStyle(item.statusType)}`}>
                                        {item.status}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-[#EAECEF] flex justify-between items-center text-[10px] sm:text-[11px] text-gray-400 font-bold">
                                    <span>Last updated: {item.updated}</span>
                                    <span className="text-gray-300 hidden sm:inline">Last updated: {item.updated}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackIssues;
