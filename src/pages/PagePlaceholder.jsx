import React from 'react';
import { Input, Select, Checkbox, Radio } from '../components/common/Forms';
import Button from '../components/common/Button';

const PagePlaceholder = ({ title = "New Page" }) => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-20">
            <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="bg-brand-purple px-6 py-8 md:px-10 md:py-12 text-white cursor-pointer group">
                    <h1 className="text-3xl md:text-4xl font-black mb-2 group-hover:translate-x-2 transition-transform duration-300">{title}</h1>
                    <p className="text-purple-100 font-medium text-sm md:text-base">Professional Registration Portal</p>
                </div>

                <div className="p-6 md:p-10 space-y-8 md:space-y-10">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                        <p className="text-sm text-gray-500">Please provide accurate details to process your application faster.</p>
                    </header>

                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input label="First Name" placeholder="e.g. John" />
                            <Input label="Last Name" placeholder="e.g. Doe" />
                        </div>

                        <Input label="Email Address" type="email" placeholder="john.doe@example.com" />

                        <Select
                            label="Interested In"
                            options={[
                                { value: '', label: 'Select a program' },
                                { value: 'hosting', label: 'Live Hosting Program' },
                                { value: 'event', label: 'Event Management' },
                                { value: 'influencer', label: 'Influencer Marketing' },
                            ]}
                        />

                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-gray-700">Gender Selection</p>
                            <div className="flex flex-wrap gap-8">
                                <Radio name="gender" label="Male" />
                                <Radio name="gender" label="Female" />
                                <Radio name="gender" label="Non-binary" />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <Checkbox label="I confirm that all provided information is accurate and I agree to the platform's terms of service and privacy policy." />
                        </div>

                        <div className="pt-6">
                            <Button variant="primary" className="w-full py-4 text-lg">
                                Complete Application
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PagePlaceholder;
