import _ from 'lodash';
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
  info: null,
  cards: [],
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

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setInfo(state, action) {
      state.info = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCardsAsync.fulfilled, (state, action) => {
        state.cards = [...action.payload];
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
        state.info = 'Successfully added a card!';
      })
      .addCase(createAsync.fulfilled, (state, action) => {
        state.info = `You just paid BHT ${_.get(action, 'payload.amount')}!`;
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
          state.error = _.defaultTo(
            _.get(action, 'error.message'),
            'Oops! Something unexpected occurred.'
          );
        }
      );
  },
});

export const { setError, setInfo } = paymentSlice.actions;

export default paymentSlice.reducer;
