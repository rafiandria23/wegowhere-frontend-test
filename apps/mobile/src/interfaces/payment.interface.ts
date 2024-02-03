import { DateTime } from './';

export interface IPaymentCard {
  _id: string;
  number: string;
  name: string;
  expiration_month: string;
  expiration_year: string;
  security_code: string;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface IPaymentCardFormInput {
  number: string;
  name: string;
  expiration: string;
  security_code: string;
}

export interface IPaymentCardAddPayload {
  number: string;
  name: string;
  expiration_month: string;
  expiration_year: string;
  security_code: string;
}
