import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import OmiseClient from './omise.client';
import { IPaymentCard } from '../interfaces/payment.interface';

class ApiClient {
  private readonly client: AxiosInstance;
  private readonly omiseClient: OmiseClient;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/payment`,
    });

    this.omiseClient = new OmiseClient();
  }

  async savePaymentCard(
    payload: Omit<IPaymentCard, 'created_at' | 'updated_at'>
  ): Promise<IPaymentCard> {
    const { data: savedPaymentCard } = await this.client.post<{
      data: IPaymentCard;
    }>('/cards', payload);

    return savedPaymentCard.data;
  }

  async createPayment(
    payload: Omit<IPaymentCard, 'created_at' | 'updated_at'> & {
      amount: number;
    }
  ) {
    const createdOmiseCharge = await this.omiseClient.createCharge(payload);
    const { data: createdPayment } = await this.client.post<{ data: any }>(
      '/',
      createdOmiseCharge
    );

    return createdPayment.data;
  }

  async getPaymentCards(): Promise<IPaymentCard[]> {
    const { data: paymentCards } = await this.client.get<{
      data: IPaymentCard[];
    }>('/cards');

    return paymentCards.data;
  }

  async getPayments(): Promise<any[]> {
    const { data: payments } = await this.client.get<{ data: any[] }>('/');

    return payments.data;
  }
}

export default ApiClient;
