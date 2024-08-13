import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tableName } from './entities/route.entity';
import { type RouteDocument } from './entities/route.entity';
import { Router } from './router';
import { Request } from 'express';
@Injectable()
export class RouteService implements OnModuleInit {
    constructor(@InjectModel(tableName) private readonly route: Model<RouteDocument>) {

    }
    async getRoute(req: Request) {
        return await this.route.find({ authority: req.user.role })
    }
    async onModuleInit() {
        //默认塞入一些路由 并且不会重复塞入
        for await (let routeItem of Router) {
            const exist = await this.route.findOne({ title: routeItem.title }).exec()
            if (!exist) {
                const newRoute = new this.route(routeItem)
                await newRoute.save()
            }
        }
    }
}
