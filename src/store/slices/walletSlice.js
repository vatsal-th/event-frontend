import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWalletTransactions, getWalletSummary, getTransactionsByType } from '../../api/walletApi';
import { createWithdrawal, getWithdrawalHistory } from '../../api/withdrawalApi';

// Async thunk to fetch withdrawal history
export const fetchWithdrawalHistory = createAsyncThunk(
    'wallet/fetchWithdrawalHistory',
    async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const data = await getWithdrawalHistory(page, limit);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch withdrawal history');
        }
    }
);

// Async thunk to create a withdrawal request
export const createWithdrawalRequest = createAsyncThunk(
    'wallet/createWithdrawal',
    async (withdrawData, { rejectWithValue, dispatch }) => {
        try {
            const data = await createWithdrawal(withdrawData);
            // Refresh summary and history after successful withdrawal
            dispatch(fetchWalletSummary());
            dispatch(fetchWithdrawalHistory({ page: 1 }));
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create withdrawal request');
        }
    }
);

// Async thunk to fetch wallet summary
export const fetchWalletSummary = createAsyncThunk(
    'wallet/fetchSummary',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getWalletSummary();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch wallet summary');
        }
    }
);

// Async thunk to fetch wallet transactions
export const fetchWalletTransactions = createAsyncThunk(
    'wallet/fetchTransactions',
    async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const data = await getWalletTransactions(page, limit);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch transactions');
        }
    }
);

// Async thunk to fetch transactions by type
export const fetchTransactionsByType = createAsyncThunk(
    'wallet/fetchTransactionsByType',
    async (type, { rejectWithValue }) => {
        try {
            const data = await getTransactionsByType(type);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch transactions by type');
        }
    }
);

const initialState = {
    balance: 0,
    bankAccounts: [],
    withdrawals: [],
    withdrawalPagination: null,
    summary: null,
    transactions: [],
    pagination: null,
    filteredTransactions: [],
    loading: false,
    error: null,
    success: false
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        clearWalletState: (state) => {
            state.error = null;
            state.success = false;
        },
        addMockBankAccount: (state, action) => {
            state.bankAccounts.push({
                _id: Date.now().toString(),
                ...action.payload,
                isDefault: state.bankAccounts.length === 0
            });
            state.success = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Wallet Summary
            .addCase(fetchWalletSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWalletSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload;
                if (action.payload.currentBalance !== undefined) {
                    state.balance = action.payload.currentBalance;
                }
            })
            .addCase(fetchWalletSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Wallet Transactions
            .addCase(fetchWalletTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWalletTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.transactions;
                state.pagination = action.payload.pagination;
                if (action.payload.currentBalance !== undefined) {
                    state.balance = action.payload.currentBalance;
                }
            })
            .addCase(fetchWalletTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Transactions by Type
            .addCase(fetchTransactionsByType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsByType.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredTransactions = action.payload.transactions;
            })
            .addCase(fetchTransactionsByType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Withdrawal History
            .addCase(fetchWithdrawalHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWithdrawalHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.withdrawals = action.payload.withdrawals || [];
                state.withdrawalPagination = action.payload.pagination;
            })
            .addCase(fetchWithdrawalHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Withdrawal Request
            .addCase(createWithdrawalRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createWithdrawalRequest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createWithdrawalRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { clearWalletState, addMockBankAccount } = walletSlice.actions;
export default walletSlice.reducer;
