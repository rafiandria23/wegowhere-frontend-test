import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import { btoa } from 'react-native-quick-base64';
import { IPaymentCardAddPayload } from '../interfaces/payment.interface';

class OmiseClient {
  private readonly publicKey: string;
  private readonly secretKey: string;

  private readonly vaultClient: AxiosInstance;
  private readonly apiClient: AxiosInstance;

  constructor() {
    if (!process.env.EXPO_PUBLIC_OMISE_PUBLIC_KEY) {
      throw new Error('EXPO_PUBLIC_OMISE_PUBLIC_KEY env has to be set!');
    }

    if (!process.env.EXPO_PUBLIC_OMISE_SECRET_KEY) {
      throw new Error('EXPO_PUBLIC_OMISE_SECRET_KEY env has to be set!');
    }

    this.publicKey = process.env.EXPO_PUBLIC_OMISE_PUBLIC_KEY;
    this.secretKey = process.env.EXPO_PUBLIC_OMISE_SECRET_KEY;

    const headers = {
      'Content-Type': 'application/json',
      'Omise-Version': '2019-05-29',
    };

    this.vaultClient = axios.create({
      baseURL: 'https://vault.omise.co',
      headers,
    });
    this.apiClient = axios.create({
      baseURL: 'https://api.omise.co',
      headers,
    });

    this.createToken = this.createToken.bind(this);
  }

  public async createToken(payload: IPaymentCardAddPayload) {
    const { data } = await this.vaultClient.post(
      '/tokens',
      {
        card: {
          number: payload.number,
          name: payload.name,
          expiration_month: payload.expiration_month,
          expiration_year: payload.expiration_year,
          security_code: payload.security_code,
          city: 'Bangkok',
          postal_code: '10100',
        },
      },
      {
        headers: {
          Authorization: `Basic ${btoa(this.publicKey + ':')}`,
        },
      }
    );

    return data;
  }

  public async createCharge(
    payload: IPaymentCardAddPayload & {
      amount: number;
    }
  ) {
    const createdToken = await this.createToken(_.omit(payload, ['amount']));

    const { data: createdCharge } = await this.apiClient.post(
      '/charges',
      {
        currency: 'THB',
        card: createdToken.id,
        amount: payload.amount,
      },
      {
        headers: {
          Authorization: `Basic ${btoa(this.secretKey + ':')}`,
        },
      }
    );

    return createdCharge;
  }
}

export default OmiseClient;
