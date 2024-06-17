import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TableName, CourseDocument } from './entities/course.entity';
import { Query } from './dto/create-course.dto';
@Injectable()
export class CourseService {
  constructor(@InjectModel(TableName) private readonly course: Model<CourseDocument>) { }
  create(createCourseDto: CreateCourseDto) {
    const course = new this.course(createCourseDto)
    return course.save()
  }

  async findAll(query: Query) {
    const { pageNo = 1, pageSize = 10 } = query
    const skip = (pageNo - 1) * pageSize
    const search = { courseName: new RegExp(query.keyWord, 'i') }
    const total = await this.course.countDocuments(search)
    const data = await this.course.find(search).sort({ _id: -1 }).skip(skip).limit(Number(pageSize)).exec()
    return {
      data,
      total
    }
  }


  update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = this.course.findByIdAndUpdate(id, updateCourseDto)
    return course
  }

  remove(_id: string) {
    const course = this.course.findByIdAndDelete(_id)
    return course
  }
}
