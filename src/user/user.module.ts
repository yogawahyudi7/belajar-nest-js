import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../common/response/response.interceptor';

@Module({
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
