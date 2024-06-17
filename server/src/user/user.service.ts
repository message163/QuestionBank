import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName, type UserDocument } from './entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid'
import type { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(TableName) private readonly user: Model<UserDocument>,
    private readonly jwt: AuthService
  ) { }
  create(createUserDto: CreateUserDto) {
    const createUser = new this.user({ ...createUserDto, uuid: uuid.v4() });
    return createUser.save();
  }

  createCode(req, res: Response) {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      color: true,
      noise: 2,
      width: 100,
      height: 40,
      fontSize: 50,
      background: '#cc9966'
    })

    req.session['captcha'] = captcha.text
    res.type('svg')
    res.send(captcha.data)
  }

  async login(data, session) {
    const { code } = data
    const captcha = session['captcha']
    const result = {
      message: '',
      token: ''
    }
    if (code.toLowerCase() !== captcha.toLowerCase()) {
      result.message = '验证码错误'
      return result //优化 如果验证错误就不要查询数据库了
    }
    const user = await this.user.findOne({ account: data.account, password: data.password })
    if (user) {
      result.message = '登录成功'
      result.token = this.jwt.createToken(user)
    } else {
      result.message = '用户名或密码错误'
    }
    return result
  }

  getInfo(req) {
    return req.user
  }
}
