import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'account',
            passwordField: 'password',
        });
    }

    // 重写validate方法
    async validate(account, password) {
        // 调用在服务层验证的方法
        const user = await this.authService.validateUser({ account, password });
        if (!user) {
            throw new UnauthorizedException({
                data: {
                    message: '用户名或密码错误'
                },
                code: 401
            });
        }
        return user;
    }
}

