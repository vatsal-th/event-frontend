import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUnreadCount } from '../../api/notificationsApi';

export const fetchUnreadCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUnreadCount();
            if (response.success) {
                return response.unreadCount;
            }
            return rejectWithValue(response.message);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        unreadCount: 0,
        loading: false,
        error: null
    },
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        resetUnreadCount: (state) => {
            state.unreadCount = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnreadCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUnreadCount.fulfilled, (state, action) => {
                state.loading = false;
                state.unreadCount = action.payload;
                state.error = null;
            })
            .addCase(fetchUnreadCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setUnreadCount, resetUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;
