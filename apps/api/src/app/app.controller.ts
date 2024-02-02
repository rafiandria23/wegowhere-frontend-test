import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { SavePaymentCardDto } from './dto/save-payment-card.dto';

@Controller('/api/v1/payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/cards')
  @HttpCode(HttpStatus.CREATED)
  async savePaymentCard(@Body() payload: SavePaymentCardDto) {
    const savedPaymentCard = await this.appService.savePaymentCard(payload);

    return savedPaymentCard;
  }

  @Get('/cards')
  @HttpCode(HttpStatus.OK)
  async findAllPaymentCards() {
    const paymentCards = await this.appService.findAllPaymentCards();

    return paymentCards;
  }
}
