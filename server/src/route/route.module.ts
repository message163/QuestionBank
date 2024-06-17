import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { MongooseModule } from '@nestjs/mongoose'
import { RouteSchema,tableName } from './entities/route.entity';
import { RouteController } from './route.controller';
@Module({
  imports: [MongooseModule.forFeature([{ name: tableName, schema: RouteSchema }])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
