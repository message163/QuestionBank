import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose'
import { TableName, GradeDocument } from './entities/grade.entity'
import type { Model } from 'mongoose'
@Injectable()
export class GradeService {
  constructor(@InjectModel(TableName) private readonly Grade: Model<GradeDocument>) {

  }
  async create(createGradeDto: CreateGradeDto) {
    return await this.Grade.create(createGradeDto)
  }

  findAll() {
    return this.Grade.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
