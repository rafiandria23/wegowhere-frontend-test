import { DateTime } from './';

export interface IPaymentCard {
  _id: string;
  number: string;
  holder: string;
  expiry_date: DateTime | string;
  cvv: string;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface IPaymentCardFormInput {
  number: string;
  holder: string;
  expiry_date: DateTime | string;
  cvv: string;
}
