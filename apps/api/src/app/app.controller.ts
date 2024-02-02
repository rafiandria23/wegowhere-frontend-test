import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AddPaymentCardDto } from './dto/save-payment-card.dto';

@Controller('/api/v1/payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/cards')
  @HttpCode(HttpStatus.CREATED)
  async addPaymentCard(@Body() payload: AddPaymentCardDto) {
    const addedPaymentCard = await this.appService.addPaymentCard(payload);

    return addedPaymentCard;
  }

  @Get('/cards')
  @HttpCode(HttpStatus.OK)
  async findAllPaymentCards() {
    const paymentCards = await this.appService.findAllPaymentCards();

    return paymentCards;
  }
}
