import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import WhyChooseUsSection from '../components/landing/WhyChooseUsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <WhyChooseUsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
};

export default LandingPage;
