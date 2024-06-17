import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { projectSecret } from '@questionbank/config/secret';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, TableName } from '../user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: projectSecret, signOptions: { expiresIn: '30d' } }), //注意token有效期为30天
    MongooseModule.forFeature([{ name: TableName, schema: UserSchema }]),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,],
  controllers: [AuthController],
  exports: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule { }
