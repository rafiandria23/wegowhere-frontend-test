import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRootState, IPaymentState } from '../interfaces/redux.interface';
import { IPaymentCard } from '../interfaces/payment.interface';

const initialState: IPaymentState = {
  loading: false,
  error: null,
  cards: [
    {
      _id: 'asdasdasd',
      number: '1234567891234567',
      name: 'Ty Lee',
      expiration_month: '12',
      expiration_year: '12',
      security_code: '123',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};

export const setCardsAsync = createAsyncThunk<
  IPaymentCard[],
  void,
  { state: IRootState }
>('payment/setCards', async (_: void) => {
  return [];
});

export const addCardAsync = createAsyncThunk<
  IPaymentCard,
  void,
  { state: IRootState }
>('payment/addCard', async (_: void) => {
  return {} as IPaymentCard;
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
