import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { TableName, GradeSchema } from './entities/grade.entity'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TableName, schema: GradeSchema }])
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule { }
