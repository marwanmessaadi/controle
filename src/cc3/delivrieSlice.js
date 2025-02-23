import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliveries: [],
  loading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    fetchDeliveriesStart: (state) => {
      state.loading = true;
    },
    fetchDeliveriesSuccess: (state, action) => {
      state.loading = false;
      state.deliveries = action.payload;
    },
    fetchDeliveriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addDelivery: (state, action) => {
      state.deliveries.push(action.payload);
    },
    updateDeliveryStatus: (state, action) => {
      const { id, status } = action.payload;
      const delivery = state.deliveries.find(d => d.id === id);
      if (delivery) {
        delivery.status = status;
      }
    },
    
  },
});

export const { fetchDeliveriesStart, fetchDeliveriesSuccess, fetchDeliveriesFailure, addDelivery, updateDeliveryStatus } = deliverySlice.actions;
export default deliverySlice.reducer;
