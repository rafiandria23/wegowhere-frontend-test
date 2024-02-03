import { createSlice } from '@reduxjs/toolkit';

import { IPaymentState } from '../../interfaces/redux.interface';
import { findAllPaymentCards, addPaymentCard } from '../thunks/payment.thunk';

const initialState: IPaymentState = {
  cards: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findAllPaymentCards.fulfilled, (state, action) => {
        state.cards = [...action.payload];
      })
      .addCase(addPaymentCard.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
      });
  },
});

export default paymentSlice.reducer;
