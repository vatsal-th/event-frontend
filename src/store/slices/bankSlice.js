import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBankDetails, addOrUpdateBankDetails, deleteBankDetails } from '../../api/bankApi';

// Async thunk to fetch bank details
export const fetchBankDetails = createAsyncThunk(
    'bank/fetchDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getBankDetails();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch bank details');
        }
    }
);

// Async thunk to add or update bank details
export const saveBankDetails = createAsyncThunk(
    'bank/saveDetails',
    async (bankData, { rejectWithValue }) => {
        try {
            const response = await addOrUpdateBankDetails(bankData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to save bank details');
        }
    }
);

// Async thunk to delete bank details
export const removeBankDetails = createAsyncThunk(
    'bank/removeDetails',
    async (_, { rejectWithValue }) => {
        try {
            await deleteBankDetails();
            return null;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete bank details');
        }
    }
);

const initialState = {
    details: null,
    loading: false,
    error: null,
    success: false,
};

const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        clearBankState: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bank Details
            .addCase(fetchBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(fetchBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save Bank Details
            .addCase(saveBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(saveBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
                state.success = true;
            })
            .addCase(saveBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Remove Bank Details
            .addCase(removeBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeBankDetails.fulfilled, (state) => {
                state.loading = false;
                state.details = null;
                state.success = true;
            })
            .addCase(removeBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBankState } = bankSlice.actions;
export default bankSlice.reducer;
