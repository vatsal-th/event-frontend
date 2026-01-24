import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { LuMail, LuArrowRight, LuLoader } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../layout/AuthLayout';
import { forgotPassword } from '../store/slices/authSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your email to get a reset link" error={error} success={success ? "Email sent! Check your inbox." : null}>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            <span>Sending...</span>
                        </div>
                    ) : (
                        <>
                            Send Reset Link
                            <LuArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-sm font-medium text-brand-purple hover:text-indigo-500 transition-colors">
                        Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
