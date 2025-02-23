import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to set auth header
const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Async thunks
export const createBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings`,
        bookingData,
        getConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyBookings = createAsyncThunk(
  'bookings/getMyBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/bookings/my-bookings`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookingByPNR = createAsyncThunk(
  'bookings/getByPNR',
  async (pnrNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/bookings/pnr/${pnrNumber}`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancel',
  async ({ bookingId, reason }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/cancel`,
        { reason },
        getConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
  success: false
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.selectedBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create booking';
      })
      // Get My Bookings
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bookings = action.payload;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bookings';
      })
      // Get Booking by PNR
      .addCase(getBookingByPNR.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByPNR.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(getBookingByPNR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedBooking = action.payload.booking;
        const index = state.bookings.findIndex(
          (booking) => booking._id === action.payload.booking._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload.booking;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export const { clearSelectedBooking, clearError, clearSuccess } = bookingSlice.actions;
export default bookingSlice.reducer; 