import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

const initialState = {
  statistics: {
    totalBookings: 0,
    activeTrains: 0,
    cancelledBookings: 0,
    totalRevenue: 0
  },
  trains: [],
  selectedTrain: null,
  loading: false,
  error: null,
  success: false
};

// Get dashboard statistics
export const getDashboardStatistics = createAsyncThunk(
  'admin/getDashboardStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/statistics');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch statistics' });
    }
  }
);

// Create a new train
export const createTrain = createAsyncThunk(
  'admin/createTrain',
  async (trainData, { rejectWithValue }) => {
    try {
      // Format dates to ISO string
      const formattedData = {
        ...trainData,
        departureTime: new Date(trainData.departureTime).toISOString(),
        arrivalTime: new Date(trainData.arrivalTime).toISOString(),
        classes: trainData.classes.map(cls => ({
          type: cls.type,
          price: Number(cls.price),
          totalSeats: Number(cls.totalSeats),
          availableSeats: Number(cls.totalSeats) // Initially all seats are available
        }))
      };

      const response = await axios.post('/admin/trains', formattedData);
      return response.data;
    } catch (error) {
      console.error('Create train error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: 'Failed to create train' });
    }
  }
);

// Get all trains
export const getAllTrains = createAsyncThunk(
  'admin/getAllTrains',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/trains');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch trains' });
    }
  }
);

// Update train
export const updateTrain = createAsyncThunk(
  'admin/updateTrain',
  async ({ id, trainData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/admin/trains/${id}`, trainData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update train' });
    }
  }
);

// Delete train
export const deleteTrain = createAsyncThunk(
  'admin/deleteTrain',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/trains/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete train' });
    }
  }
);

// Update train status
export const updateTrainStatus = createAsyncThunk(
  'admin/updateTrainStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/admin/trains/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update train status' });
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setSelectedTrain: (state, action) => {
      state.selectedTrain = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Dashboard Statistics
      .addCase(getDashboardStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(getDashboardStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch statistics';
      })
      // Create Train
      .addCase(createTrain.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTrain.fulfilled, (state, action) => {
        state.loading = false;
        state.trains.push(action.payload);
        state.success = true;
      })
      .addCase(createTrain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create train';
        state.success = false;
      })
      // Get All Trains
      .addCase(getAllTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = action.payload;
      })
      .addCase(getAllTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Update Train
      .addCase(updateTrain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrain.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = state.trains.map(train =>
          train._id === action.payload._id ? action.payload : train
        );
        state.success = true;
      })
      .addCase(updateTrain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Delete Train
      .addCase(deleteTrain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrain.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = state.trains.filter(train => train._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteTrain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Update Train Status
      .addCase(updateTrainStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = state.trains.map(train =>
          train._id === action.payload._id ? action.payload : train
        );
        state.success = true;
      })
      .addCase(updateTrainStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  }
});

export const { clearError, clearSuccess, setSelectedTrain } = adminSlice.actions;
export default adminSlice.reducer; 