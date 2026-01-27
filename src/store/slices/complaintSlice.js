import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';

export const fetchMyComplaints = createAsyncThunk(
    'complaints/fetchMy',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/complaints/my');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createComplaint = createAsyncThunk(
    'complaints/create',
    async (formData, { rejectWithValue }) => {
        try {
            const data = await apiClient('/api/complaints', {
                method: 'POST',
                body: formData,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    complaints: [],
    loading: false,
    submitLoading: false,
    error: null,
    success: false,
};

const complaintSlice = createSlice({
    name: 'complaints',
    initialState,
    reducers: {
        clearComplaintStatus: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Complaints
        builder
            .addCase(fetchMyComplaints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyComplaints.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload;
            })
            .addCase(fetchMyComplaints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create Complaint
        builder
            .addCase(createComplaint.pending, (state) => {
                state.submitLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createComplaint.fulfilled, (state, action) => {
                state.submitLoading = false;
                state.success = true;
                state.complaints = [action.payload, ...state.complaints];
            })
            .addCase(createComplaint.rejected, (state, action) => {
                state.submitLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearComplaintStatus } = complaintSlice.actions;
export default complaintSlice.reducer;
