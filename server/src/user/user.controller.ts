import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Req, Res, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { type User } from '@questionbank/config/user'
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // 创建用户
  @Post('/create')
  create(@Body() createUserDto: User) {
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
  // 获取用户列表
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getUserList() {
    return this.userService.getUserList()
  }
  // 获取用户账号
  @Get('/account')
  getUserAccount(@Query() query: { keyWord: string }) {
    return this.userService.getUserAccount(query)
  }
  // 删除用户
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  removUser(@Param('id') id: string) {
    return this.userService.removUser(id);
  }

  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

}
