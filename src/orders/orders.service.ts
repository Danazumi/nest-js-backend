// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from '../auth/schemas/user.schema';

@Injectable() 
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    private notificationsService: NotificationsService,
  ) {}

  async create(userEmail: string, orderData: any): Promise<Order> {
    const newOrder = new this.orderModel({
      userEmail,
      productId: orderData.productId,
      productName: orderData.productName,
      price: orderData.price,
    });
    const savedOrder = await newOrder.save();

    //Find user to get phone no
    const user = await this.userModel.findOne({email : userEmail})

    if (user && user.phoneNumber){
      //send notific.
      await this.notificationsService.notifyOrderPlaced(
        userEmail,
        user.phoneNumber,
        orderData.productName,
        orderData.price
      )

    }
    return savedOrder
  }

  async countByUserEmail(userEmail: string): Promise<number> {
    return this.orderModel.countDocuments({ userEmail }).exec();
  }

  async findByUserEmail(userEmail: string): Promise<Order[]> {
    return this.orderModel.find({ userEmail }).sort({ createdAt: -1 }).exec();
  }
}








// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order } from './order.model';


// @Injectable()
// export class OrdersService {
//   constructor(
//     @InjectModel(Order.name) private orderModel: Model<Order>,
//   ) {}

//   async create(userEmail: string, orderData: any): Promise<Order> {
//     const newOrder = new this.orderModel({
//       userEmail,
//       productId: orderData.productId,
//       productName: orderData.productName,
//       price: orderData.price,
//     });
//     return newOrder.save();
//   }

//   async countByUserEmail(userEmail: string): Promise<number> {
//     return this.orderModel.countDocuments({ userEmail }).exec();
//   }

//   async findByUserEmail(userEmail: string): Promise<Order[]> {
//     return this.orderModel.find({ userEmail }).sort({ createdAt: -1 }).exec();
//   }
// }