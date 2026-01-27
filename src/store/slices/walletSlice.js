import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for initial state/testing
const mockBankAccounts = [
    {
        _id: '1',
        accountHolderName: 'Vatsal Thaker',
        accountNumber: 'XXXXXX5842',
        ifscCode: 'ICIC0001234',
        bankName: 'ICICI Bank',
        isDefault: true
    }
];

const mockWithdrawals = [
    {
        _id: 'w1',
        amount: 500,
        status: 'approved',
        requestedAt: '2024-01-20T10:00:00Z',
        bankAccount: mockBankAccounts[0],
    },
    {
        _id: 'w2',
        amount: 200,
        status: 'rejected',
        rejectionReason: 'Invalid IFSC code provided. Please update your bank details.',
        requestedAt: '2024-01-22T14:30:00Z',
        bankAccount: mockBankAccounts[0],
    },
    {
        _id: 'w3',
        amount: 1000,
        status: 'pending',
        requestedAt: '2024-01-25T09:15:00Z',
        bankAccount: mockBankAccounts[0],
    }
];

const initialState = {
    balance: 732, // Based on the UI screenshot earlier
    bankAccounts: mockBankAccounts,
    withdrawals: mockWithdrawals,
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
        },
        requestMockWithdrawal: (state, action) => {
            const { amount, bankAccountId } = action.payload;
            if (state.balance >= amount) {
                state.balance -= amount;
                state.withdrawals.unshift({
                    _id: 'w' + Date.now(),
                    amount,
                    bankAccount: state.bankAccounts.find(b => b._id === bankAccountId),
                    status: 'pending',
                    requestedAt: new Date().toISOString()
                });
                state.success = true;
            } else {
                state.error = 'Insufficient balance';
            }
        }
    }
});

export const { clearWalletState, addMockBankAccount, requestMockWithdrawal } = walletSlice.actions;
export default walletSlice.reducer;
