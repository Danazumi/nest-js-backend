// src/orders/order.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);