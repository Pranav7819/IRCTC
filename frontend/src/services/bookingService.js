import axios from 'axios';
import { API_BASE_URL } from '../config';

const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Failed to create booking',
      status: error.response?.status
    };
  }
};

const getMyBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Failed to fetch bookings',
      status: error.response?.status
    };
  }
};

const getBookingByPNR = async (pnr) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${pnr}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Failed to fetch booking details',
      status: error.response?.status
    };
  }
};

const cancelBooking = async (pnr) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings/${pnr}/cancel`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Failed to cancel booking',
      status: error.response?.status
    };
  }
};

export {
  createBooking,
  getMyBookings,
  getBookingByPNR,
  cancelBooking
}; 