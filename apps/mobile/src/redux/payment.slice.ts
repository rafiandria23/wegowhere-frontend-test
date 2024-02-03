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
  cards: [],
};

export const fetchCardsAsync = createAsyncThunk<
  IPaymentCard[],
  void,
  { state: IRootState }
>('payment/fetchCards', async (__: void) => {
  try {
    const paymentCards = await apiClient.findAllPaymentCards();

    return paymentCards;
  } catch (err) {
    throw _.defaultTo(_.get(err, 'response.data'), err);
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
    throw _.defaultTo(_.get(err, 'response.data'), err);
  }
});

export const createAsync = createAsyncThunk<
  object,
  IPaymentCardAddPayload & { amount: number },
  { state: IRootState }
>('/payment/create', async (payload) => {
  try {
    const createdPayment = await apiClient.createPayment(payload);

    return createdPayment;
  } catch (err) {
    throw _.defaultTo(_.get(err, 'response.data'), err);
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCardsAsync.fulfilled, (state, action) => {
        state.cards = [...action.payload];
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
      });
  },
});

export default paymentSlice.reducer;
