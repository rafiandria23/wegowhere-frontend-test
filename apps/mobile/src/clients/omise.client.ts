import _ from 'lodash';
import omise, { IOmise } from 'omise';
import { IPaymentCard } from '../interfaces/payment.interface';

export class OmiseClient {
  private readonly client: IOmise;

  constructor() {
    this.client = omise({
      publicKey: process.env.EXPO_PUBLIC_OMISE_PUBLIC_KEY,
      secretKey: process.env.EXPO_PUBLIC_OMISE_SECRET_KEY,
    });
  }

  async createToken(payload: Omit<IPaymentCard, 'created_at' | 'updated_at'>) {
    const createdToken = await this.client.tokens.create({
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
    payload: Omit<IPaymentCard, 'created_at' | 'updated_at'> & {
      amount: number;
    }
  ) {
    const createdToken = await this.createToken(_.omit(payload, ['amount']));

    const createdCharge = await this.client.charges.create({
      amount: payload.amount,
      currency: 'THB',
      capture: true,
      card: createdToken.id,
    });

    return createdCharge;
  }
}

export default OmiseClient;
