import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import dayjs from 'dayjs';

import { PaymentCard } from './schemas/payment-card.schema';
import { AddPaymentCardDto } from './dto/save-payment-card.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(PaymentCard.name)
    private readonly paymentCardModel: Model<PaymentCard>
  ) {}

  successTimestamp({ success = true, data = undefined } = {}) {
    if (data || data === null) {
      return {
        success,
        timestamp: dayjs(),
        data,
      };
    }

    return {
      success,
      timestamp: dayjs(),
    };
  }

  async addPaymentCard(payload: AddPaymentCardDto) {
    const foundCard = await this.paymentCardModel.findOne({
      number: payload.number,
    });

    if (foundCard) {
      throw new UnprocessableEntityException(
        'Payment card with that number already exists!'
      );
    }

    const addedPaymentCard = (
      await this.paymentCardModel.create({
        number: payload.number,
        name: payload.name,
        expiration_month: payload.expiration_month,
        expiration_year: payload.expiration_year,
        security_code: payload.security_code,
      })
    ).toObject();

    return this.successTimestamp({ data: addedPaymentCard });
  }

  async findAllPaymentCards() {
    const paymentCards = (await this.paymentCardModel.find()).map(
      (payentCard) => payentCard.toObject()
    );

    return this.successTimestamp({
      data: paymentCards,
    });
  }
}
