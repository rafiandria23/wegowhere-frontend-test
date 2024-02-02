import _ from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRootState, IPaymentState } from '../interfaces/redux.interface';
import {
  IPaymentCard,
  IPaymentCardAddPayload,
} from '../interfaces/payment.interface';
import ApiClient from '../clients/api.client';

const apiClient = new ApiClient();

const initialState: IPaymentState = {
  loading: false,
  error: null,
  cards: [],
};

export const setCardsAsync = createAsyncThunk<
  IPaymentCard[],
  void,
  { state: IRootState }
>('payment/setCards', async (__: void) => {
  try {
    const paymentCards = await apiClient.findAllPaymentCards();

    return paymentCards;
  } catch (err) {
    throw _.get(err, 'response.data.data');
  }
});

export const addCardAsync = createAsyncThunk<
  IPaymentCard,
  IPaymentCardAddPayload,
  { state: IRootState }
>('payment/addCard', async (payload) => {
  try {
    const addedPaymentCard = await apiClient.addPaymentCard(payload);

    return addedPaymentCard;
  } catch (err) {
    throw _.get(err, 'response.data.data');
  }
});

const slice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setCardsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCardsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = [...action.payload];
      })
      .addCase(setCardsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addCardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = [...state.cards, action.payload];
      })
      .addCase(addCardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default slice.reducer;
