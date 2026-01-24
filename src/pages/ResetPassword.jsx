import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { LuLock, LuArrowRight, LuLoader, LuEye, LuEyeOff } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/slices/authSlice';
import AuthLayout from '../layout/AuthLayout';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const resultAction = await dispatch(resetPassword({ token, password }));
        if (resetPassword.fulfilled.match(resultAction)) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    return (
        <AuthLayout
            title="New Password"
            subtitle="Create a new secure password"
            error={error || message}
            success={success ? "Password reset successful! Redirecting..." : null}
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
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
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
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
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <span>Resetting...</span>
                        </div>
                    ) : (
                        <>
                            Set New Password
                            <LuArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
