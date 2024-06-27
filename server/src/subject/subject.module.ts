import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MongooseModule } from '@nestjs/mongoose'
import {TableName,SubjectSchema} from './entities/subject.entity'
@Module({
  imports: [MongooseModule.forFeature([{ name: TableName, schema: SubjectSchema }])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule { }
