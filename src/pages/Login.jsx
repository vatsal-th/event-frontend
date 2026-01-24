import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { LuMail, LuLock, LuArrowRight, LuLoader, LuEye, LuEyeOff } from 'react-icons/lu';
import AuthLayout from '../layout/AuthLayout';

const Login = () => {
    const { login, isAuthenticated, loading, error, clearError } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        // Clear errors on mount/unmount
        return () => clearError();
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) clearError(); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email: formData.email, password: formData.password });
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to access your dashboard" error={error}>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                        <div className="flex items-center justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="text-sm">
                                <Link to="/forgotpassword" className="font-medium text-brand-purple hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LuLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                                placeholder="Enter your password"
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
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        <>
                            Sign in
                            <LuArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-brand-purple hover:text-indigo-500 transition-colors">
                            Register now
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
