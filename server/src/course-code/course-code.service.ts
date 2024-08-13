import { Injectable } from '@nestjs/common';
import { CreateCourseCodeDto } from './dto/create-course-code.dto';
import { UpdateCourseCodeDto } from './dto/update-course-code.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName, type CourseCodeDocument } from './entities/course-code.entity';
import { Request } from 'express';
@Injectable()
export class CourseCodeService {
  constructor(@InjectModel(TableName) private readonly courseCode: Model<CourseCodeDocument>) { }
  create(req: Request) {
    const body = { ...req.body, uuid: req.user.uuid }
    return this.courseCode.create(body);
  }

  findAll() {
    return this.courseCode.find()
  }


  update(id: string, updateCourseCodeDto: UpdateCourseCodeDto) {
    return this.courseCode.updateOne({ _id: id }, updateCourseCodeDto)
  }

  remove(id: string) {
    return this.courseCode.findByIdAndDelete(id)
  }
}
