import { IPaymentCard } from './payment.interface';

export interface IPaymentState {
  cards: IPaymentCard[];
}

export interface IRootState {
  payment: IPaymentState;
}
