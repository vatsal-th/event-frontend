import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData),
            });

            const { token, ...user } = data;

            // Allow auto-login after register by returning token/user
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            return { user, token };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ... (existing imports)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/auth/forgotpassword', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const data = await apiClient(`/api/auth/resetpassword/${token}`, {
                method: 'PUT',
                body: JSON.stringify({ password }),
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/auth/me');
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateDetails = createAsyncThunk(
    'auth/updateDetails',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/auth/updatedetails', {
                method: 'PUT',
                body: JSON.stringify(userData),
            });
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    // ... (existing loginUser)
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });

            const { token, ...user } = data;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            return { user, token };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Helper to safely parse JSON from localStorage
const getLocalStorageItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item || item === 'undefined') return null;
        return JSON.parse(item);
    } catch (e) {
        return null;
    }
};

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: getLocalStorageItem('user'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
            state.success = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // ... (existing reducers)

        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true; // Email sent
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Me
        builder
            .addCase(getMe.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            });

        // Update Details
        builder
            .addCase(updateDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(updateDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
