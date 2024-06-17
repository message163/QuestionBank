import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() body, @Session() session) {
    return 213123
  }

}
