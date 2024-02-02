import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type PaymentCardDocument = HydratedDocument<PaymentCard>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class PaymentCard {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    length: 16,
  })
  number: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    length: 2,
  })
  expiration_month: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    length: 2,
  })
  expiration_year: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    length: 3,
  })
  security_code: string;
}

export const PaymentCardSchema = SchemaFactory.createForClass(PaymentCard);
