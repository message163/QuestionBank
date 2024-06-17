import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { TableName, CourseSchema } from './entities/course.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: TableName, schema: CourseSchema }])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule { }
