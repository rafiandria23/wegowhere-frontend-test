import _ from 'lodash';
import omise from 'omise-react-native';
import { IPaymentCardAddPayload } from '../interfaces/payment.interface';

export class OmiseClient {
  constructor() {
    omise.config(
      process.env.EXPO_PUBLIC_OMISE_PUBLIC_KEY,
      process.env.EXPO_PUBLIC_OMISE_SECRET_KEY,
      '2017-11-12'
    );
  }

  async createToken(payload: IPaymentCardAddPayload) {
    const createdToken = await omise.createToken({
      card: {
        number: payload.number,
        name: payload.name,
        expiration_month: payload.expiration_month,
        expiration_year: payload.expiration_year,
        security_code: payload.security_code,
        city: 'Bangkok',
        postal_code: '10100',
      },
    });

    return createdToken;
  }

  async createCharge(
    payload: IPaymentCardAddPayload & {
      amount: number;
    }
  ) {
    const createdToken = await this.createToken(_.omit(payload, ['amount']));

    const createdCharge = await omise.createCharge.create({
      capture: true,
      currency: 'THB',
      card: createdToken.id,
      amount: payload.amount,
    });

    return createdCharge;
  }
}

export default OmiseClient;
