import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAbout(): any {
    return {
      message: 'This is a simple API built with NestJS',
      code: 200,
      tara: 'tara',
    };
  }
}
