import _ from 'lodash';
import expoConstants from 'expo-constants';
import axios, { AxiosInstance } from 'axios';
import OmiseClient from './omise.client';
import {
  IPaymentCard,
  IPaymentCardAddPayload,
} from '../interfaces/payment.interface';

class ApiClient {
  private readonly client: AxiosInstance;
  private readonly omiseClient: OmiseClient;

  constructor() {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error('EXPO_PUBLIC_API_URL env has to be set!');
    }

    const expoHostUri = _.get(expoConstants, 'expoConfig.hostUri');
    const apiPort = _.defaultTo(
      process.env.EXPO_PUBLIC_API_URL?.split(':').pop(),
      3000,
    );

    this.client = axios.create({
      baseURL: `${
        expoHostUri
          ? `http://${expoHostUri.split(':').shift()}:${apiPort}`
          : process.env.EXPO_PUBLIC_API_URL
      }/api/v1/payment`,
    });

    this.omiseClient = new OmiseClient();
  }

  public async addPaymentCard(
    payload: IPaymentCardAddPayload,
  ): Promise<IPaymentCard> {
    // Check the payment card details to make sure it passes Omise's validation.
    await this.omiseClient.createToken(payload);

    const { data: addedPaymentCard } = await this.client.post<{
      data: IPaymentCard;
    }>('/cards', payload);

    return addedPaymentCard.data;
  }

  public async createPayment(
    payload: IPaymentCardAddPayload & {
      amount: number;
    },
  ) {
    const createdOmiseCharge = await this.omiseClient.createCharge(payload);

    return createdOmiseCharge;
  }

  public async findAllPaymentCards(): Promise<IPaymentCard[]> {
    const { data: paymentCards } = await this.client.get<{
      data: IPaymentCard[];
    }>('/cards');

    return paymentCards.data;
  }
}

export default ApiClient;
