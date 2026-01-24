import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout, clearError, updateDetails, getMe } from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, loading, error, success } = useSelector((state) => state.auth);

    const login = (credentials) => {
        return dispatch(loginUser(credentials));
    };

    const register = (userData) => {
        return dispatch(registerUser(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    const handleClearError = () => {
        dispatch(clearError());
    }

    return {
        isAuthenticated,
        user,
        loading,
        error,
        success,
        login,
        register,
        updateUser: (userData) => dispatch(updateDetails(userData)),
        refreshUser: () => dispatch(getMe()),
        logout: logoutUser,
        clearError: handleClearError
    };
};
