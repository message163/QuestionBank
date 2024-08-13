import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName as UserTableName, type UserDocument } from '../user/entities/user.entity';
import type { User } from '@questionbank/config/user';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserTableName) private readonly User: Model<UserDocument>,
    private readonly jwt: JwtService
  ) { }


  async validateUser({ account, password }) {
    const user = await this.User.findOne({ account, password })
    return user
  }


  createToken({ uuid, role, username, }: User) {
    return this.jwt.sign({ uuid, role, username })
  }
}
