import { Controller,Get, Req, UseGuards } from '@nestjs/common';
import { RouteService } from './route.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('route')
export class RouteController {

    constructor(private readonly routeService: RouteService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getRoute(@Req() req) {
        return await this.routeService.getRoute(req)
    }
}
