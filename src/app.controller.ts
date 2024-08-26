import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createResponse } from './common/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const data = this.appService.getHello();
    return createResponse(200, data);
  }

  @Get('/about')
  getAbout(): any {
    return this.appService.getAbout();
  }
}
