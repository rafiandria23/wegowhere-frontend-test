import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IRootState } from '../../interfaces/redux.interface';
import {
  IPaymentCard,
  IPaymentCardAddPayload,
} from '../../interfaces/payment.interface';
import ApiClient from '../../clients/api.client';

const apiClient = new ApiClient();

export const findAllPaymentCards = createAsyncThunk<
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

export const addPaymentCard = createAsyncThunk<
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

export const createPayment = createAsyncThunk<
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
