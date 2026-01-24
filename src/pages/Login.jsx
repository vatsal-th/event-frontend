import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PagePlaceholder from './PagePlaceholder';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        // Simulate a login
        login({ id: 1, name: 'Demo User', email: 'demo@example.com' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <PagePlaceholder title="User Login" />
            <Button onClick={handleLogin} variant="primary" className="px-10 py-3 text-lg">
                Simulate Login
            </Button>
            <p className="text-sm text-gray-500">Click to test the authenticated flow</p>
        </div>
    );
};

export default Login;
