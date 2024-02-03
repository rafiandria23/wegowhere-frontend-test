import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
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
  payments: [],
};

export const fetchCardsAsync = createAsyncThunk<
  IPaymentCard[],
  void,
  { state: IRootState }
>('payment/fetchCards', async (__: void) => {
  const paymentCards = await apiClient.findAllPaymentCards();

  return paymentCards;
});

export const addCardAsync = createAsyncThunk<
  IPaymentCard,
  IPaymentCardAddPayload,
  { state: IRootState }
>('payment/addCard', async (payload) => {
  const addedPaymentCard = await apiClient.addPaymentCard(payload);

  return addedPaymentCard;
});

export const createAsync = createAsyncThunk<
  object,
  IPaymentCardAddPayload & { amount: number },
  { state: IRootState }
>('/payment/create', async (payload) => {
  const createdPayment = await apiClient.createPayment(payload);

  return createdPayment;
});

const slice = createSlice({
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
      })
      .addCase(createAsync.fulfilled, (state, action) => {
        state.payments = [...state.payments, action.payload];
      })
      .addMatcher(
        isAnyOf(
          fetchCardsAsync.pending,
          addCardAsync.pending,
          createAsync.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCardsAsync.fulfilled,
          addCardAsync.fulfilled,
          createAsync.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCardsAsync.rejected,
          addCardAsync.rejected,
          createAsync.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error;
        }
      );
  },
});

export default slice.reducer;
