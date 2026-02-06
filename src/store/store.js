import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import walletReducer from './slices/walletSlice';
import bankReducer from './slices/bankSlice';
import complaintReducer from './slices/complaintSlice';
import dropdownReducer from './slices/dropdownSlice';
import referralReducer from './slices/referralSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: walletReducer,
        bank: bankReducer,
        complaints: complaintReducer,
        dropdowns: dropdownReducer,
        referrals: referralReducer,
    },
});

