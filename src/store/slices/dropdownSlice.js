import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDropdowns } from '../../api/dropdownApi';

export const fetchDropdowns = createAsyncThunk(
    'dropdowns/fetchDropdowns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getDropdowns();
            if (response.success) {
                return response.data;
            } else {
                return rejectWithValue(response.message || 'Failed to fetch dropdowns');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    countries: [],
    categories: [],
    apps: [],
    loading: false,
    error: null,
    lastFetched: null,
};

const dropdownSlice = createSlice({
    name: 'dropdowns',
    initialState,
    reducers: {
        clearDropdownError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDropdowns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDropdowns.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload.countries || [];
                state.categories = action.payload.categories || [];
                state.apps = action.payload.apps || [];
                state.lastFetched = Date.now();
            })
            .addCase(fetchDropdowns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearDropdownError } = dropdownSlice.actions;

// Selectors
export const selectCountries = (state) => state.dropdowns.countries;
export const selectCategories = (state) => state.dropdowns.categories;
export const selectApps = (state) => state.dropdowns.apps;
export const selectDropdownLoading = (state) => state.dropdowns.loading;
export const selectDropdownError = (state) => state.dropdowns.error;

export default dropdownSlice.reducer;
