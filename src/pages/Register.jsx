import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { LuUser, LuMail, LuLock, LuArrowRight, LuLoader, LuEye, LuEyeOff } from 'react-icons/lu';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../layout/AuthLayout';

const Register = () => {
    const navigate = useNavigate();
    const { register, isAuthenticated, loading, error, clearError } = useAuth();
    const [formData, setFormData] = useState({
        name: '', // Maps to fullName in backend
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        referralCode: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        return () => clearError();
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
        }
        await register({
            fullName: formData.name,
            email: formData.email,
            gender: formData.gender,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            referralCode: formData.referralCode
        });
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join us and start your journey today" error={error}>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['Male', 'Female', 'Other'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: option.toLowerCase() })}
                                    className={`
                                        py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer
                                        ${formData.gender === option.toLowerCase()
                                            ? 'bg-brand-purple text-white border-brand-purple shadow-md shadow-purple-100'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-brand-purple/50 hover:bg-purple-50'
                                        }
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="referralCode"
                                name="referralCode"
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Enter referral code (optional)"
                                value={formData.referralCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-lg group relative flex justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <LuLoader className="animate-spin" />
                            <span>Creating...</span>
                        </div>
                    ) : (
                        <>
                            Create Account
                            <LuArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-brand-purple hover:text-indigo-500 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
