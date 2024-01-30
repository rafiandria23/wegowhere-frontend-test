import { DateTime } from './';

export interface IPaymentCard {
  _id: string;
  number: string;
  holder_name: string;
  expiry_date: DateTime;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface IPaymentCardFormInput {
  number: string;
  holder_name: string;
  expiry_date: DateTime | null;
  cvv: string;
}
