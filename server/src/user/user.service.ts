import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { type User } from '@questionbank/config/user'
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName, type UserDocument } from './entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid'
import type { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import * as md5 from 'md5'
@Injectable()
export class UserService {
  constructor(
    @InjectModel(TableName) private readonly user: Model<UserDocument>,
    private readonly jwt: AuthService
  ) { }
  create(createUserDto: User) {
    const createUser = new this.user({ ...createUserDto, uuid: uuid.v4(), password: md5(createUserDto.password) });
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

  getUserList() {
    return this.user.find()
  }

  async getUserAccount(queryString: { keyWord: string }) {
    const user = await this.user.findOne({ account: queryString.keyWord })
    if (user) {
      return {
        code: 400,
        message: '该账号已存在'
      }
    } else {
      return {
        code: 200,
        message: '账号可用'
      }
    }
  }


  removUser(id: string) {
    return this.user.findByIdAndDelete({ _id: id })
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.user.findByIdAndUpdate({ _id: id }, updateUserDto)
  }
}
