import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUnreadCount } from '../../api/notificationsApi';

export const fetchUnreadCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUnreadCount();
            if (response.success) {
                return {
                    unreadCount: response.totalUnread || response.unreadCount || 0,
                    serviceUnread: response.serviceUnread || 0,
                    systemUnread: response.systemUnread || 0
                };
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
        serviceUnread: 0,
        systemUnread: 0,
        loading: false,
        error: null
    },
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        resetUnreadCount: (state, action) => {
            const type = action.payload; // 'service' or 'system'
            if (type === 'service') {
                state.unreadCount -= state.serviceUnread;
                state.serviceUnread = 0;
            } else if (type === 'system') {
                state.unreadCount -= state.systemUnread;
                state.systemUnread = 0;
            } else {
                state.unreadCount = 0;
                state.serviceUnread = 0;
                state.systemUnread = 0;
            }
            if (state.unreadCount < 0) state.unreadCount = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnreadCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUnreadCount.fulfilled, (state, action) => {
                state.loading = false;
                state.unreadCount = action.payload.unreadCount;
                state.serviceUnread = action.payload.serviceUnread;
                state.systemUnread = action.payload.systemUnread;
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
