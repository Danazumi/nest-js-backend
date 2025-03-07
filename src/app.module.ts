import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import {ProductsModule} from "./products/products.module"
import { OrdersModule } from './orders/orders.module'
import { NotificationsModule } from './notifications/notifications.module';

//It's like the root module of you entire app
//Import mongoose here so it can be available to the entire app
//The first import will create a DB with the name nest-js-backend-db
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal : true,
    }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




// MongooseModule.forRoot(process.env.DB_URI as string)
