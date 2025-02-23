import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import trainReducer from './slices/trainSlice';
import bookingReducer from './slices/bookingSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trains: trainReducer,
    bookings: bookingReducer,
    admin: adminReducer,
  },
});

export default store; 

