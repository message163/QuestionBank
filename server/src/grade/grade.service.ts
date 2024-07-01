import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose'
import { TableName, GradeDocument } from './entities/grade.entity'
import type { Model } from 'mongoose'
import type { Query } from './dto/create-grade.dto';
@Injectable()
export class GradeService {
  constructor(@InjectModel(TableName) private readonly Grade: Model<GradeDocument>) {

  }
  async create(createGradeDto: CreateGradeDto) {
    return await this.Grade.create(createGradeDto)
  }

  async findAll(query: Query) {
    const { pageNo = 1, pageSize = 10 } = query
    const skip = (pageNo - 1) * pageSize
    const search = { grade: query.keyWord }
    const queryKeyWord = query.keyWord ? search : {}
    const total = await this.Grade.countDocuments(queryKeyWord)
    const data = await this.Grade.find(queryKeyWord).skip(skip).limit(Number(pageSize)).exec()
    return {
      data,
      total
    }
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    return this.Grade.findByIdAndUpdate(id, updateGradeDto)
  }

  remove(id: string) {
    return this.Grade.findByIdAndDelete(id)
  }
}
