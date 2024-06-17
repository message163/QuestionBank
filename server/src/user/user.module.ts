import { type MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { projectSecret } from '@questionbank/config/secret';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, TableName } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: TableName, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), session({
      secret: projectSecret,
      resave: false,
      saveUninitialized: false,
    })).forRoutes(UserController);
  }
}
