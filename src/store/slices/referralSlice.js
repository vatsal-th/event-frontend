import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReferralStats, getLeaderboard, getReferralHistory } from '../../api/referralApi';

// Async thunks
export const fetchReferralStats = createAsyncThunk(
    'referral/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReferralStats();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchLeaderboard = createAsyncThunk(
    'referral/fetchLeaderboard',
    async (limit = 10, { rejectWithValue }) => {
        try {
            const response = await getLeaderboard(limit);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReferralHistory = createAsyncThunk(
    'referral/fetchHistory',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await getReferralHistory(page, limit);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    stats: null,
    leaderboard: [],
    history: [],
    pagination: null,
    loading: false,
    error: null,
};

const referralSlice = createSlice({
    name: 'referral',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Stats
        builder
            .addCase(fetchReferralStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchReferralStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Leaderboard
        builder
            .addCase(fetchLeaderboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.leaderboard = action.payload;
            })
            .addCase(fetchLeaderboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch History
        builder
            .addCase(fetchReferralHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReferralHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload.history;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchReferralHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = referralSlice.actions;
export default referralSlice.reducer;
