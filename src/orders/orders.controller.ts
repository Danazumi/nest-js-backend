// src/orders/orders.controller.ts
import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() orderData: any) {
    return this.ordersService.create(req.user.email, orderData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getCount(@Request() req) {
    const count = await this.ordersService.countByUserEmail(req.user.email);
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Request() req) {
    return this.ordersService.findByUserEmail(req.user.email);
  }
}