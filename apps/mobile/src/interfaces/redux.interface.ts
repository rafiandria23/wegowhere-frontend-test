import { SerializedError } from '@reduxjs/toolkit';
import { IPaymentCard } from './payment.interface';

export interface IPaymentState {
  loading: boolean;
  error: SerializedError | Error | string | null;
  cards: IPaymentCard[];
  payments: object[];
}

export interface IRootState {
  payment: IPaymentState;
}
