import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

// Async thunks
export const searchTrains = createAsyncThunk(
  'trains/search',
  async ({ source, destination, date }, { rejectWithValue }) => {
    try {
      console.log('Searching trains with:', { source, destination, date });
      const response = await axios.get('/trains/search', {
        params: { source, destination, date }
      });
      return response.data;
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to search trains. Please try again.'
      );
    }
  }
);

export const getTrainById = createAsyncThunk(
  'trains/getById',
  async (trainId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/trains/${trainId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to fetch train details.'
      );
    }
  }
);

export const getAllTrains = createAsyncThunk(
  'trains/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/trains');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  trains: [],
  selectedTrain: null,
  loading: false,
  error: null
};

const trainSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    clearTrains: (state) => {
      state.trains = [];
      state.selectedTrain = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Search Trains
      .addCase(searchTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.trains = [];
      })
      .addCase(searchTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = action.payload;
        state.error = null;
      })
      .addCase(searchTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.trains = [];
      })
      // Get Train by ID
      .addCase(getTrainById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrain = action.payload;
        state.error = null;
      })
      .addCase(getTrainById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedTrain = null;
      })
      // Get All Trains
      .addCase(getAllTrains.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = action.payload;
      })
      .addCase(getAllTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export const { clearTrains, clearError } = trainSlice.actions;
export default trainSlice.reducer; 