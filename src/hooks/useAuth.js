import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const loginUser = (userData) => {
        dispatch(login(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    return {
        isAuthenticated,
        user,
        login: loginUser,
        logout: logoutUser,
    };
};
