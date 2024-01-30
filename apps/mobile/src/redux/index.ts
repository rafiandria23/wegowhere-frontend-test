import { configureStore } from '@reduxjs/toolkit';
import { IRootState } from '../interfaces/redux.interface';
import paymentSlice from './payment.slice';

const store = configureStore<IRootState>({
  reducer: {
    payment: paymentSlice,
  },
});

export default store;
