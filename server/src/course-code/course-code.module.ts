import { Module } from '@nestjs/common';
import { CourseCodeService } from './course-code.service';
import { CourseCodeController } from './course-code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCodeSchema, TableName } from './entities/course-code.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: TableName, schema: CourseCodeSchema }])],
  controllers: [CourseCodeController],
  providers: [CourseCodeService],
})
export class CourseCodeModule { }
