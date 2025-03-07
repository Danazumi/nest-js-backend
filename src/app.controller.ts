import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//This is used for end points
//It is decorated by a controller decorator above a class,i.e defines that class as a controller
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
} 
 