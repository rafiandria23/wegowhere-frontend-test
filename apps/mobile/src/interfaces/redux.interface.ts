import { SerializedError } from '@reduxjs/toolkit';
import { IPaymentCard } from './payment.interface';

export interface IPaymentState {
  loading: boolean;
  error: SerializedError | Error | string | null;
  info: string | null;
  cards: IPaymentCard[];
}

export interface IRootState {
  payment: IPaymentState;
}
