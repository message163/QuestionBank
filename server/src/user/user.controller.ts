import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // 创建用户
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // 获取验证码
  @Get('/code')
  createCode(@Req() req, @Res() res) {
    return this.userService.createCode(req, res);
  }
  // 登录
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() body, @Session() session) {
    return this.userService.login(body, session);
  }
  // 获取用户信息
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getInfo(@Req() req) {
    return this.userService.getInfo(req);
  }

}
