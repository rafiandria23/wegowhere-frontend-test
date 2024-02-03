import { configureStore } from '@reduxjs/toolkit';
import { IRootState } from '../interfaces/redux.interface';

import paymentSlice from './slices/payment.slice';

const store = configureStore<IRootState>({
  reducer: {
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
