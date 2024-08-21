import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { type SubjectDocument, TableName } from './entities/subject.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Request } from 'express';
@Injectable()
export class SubjectService {

  constructor(@InjectModel(TableName) private readonly subject: Model<SubjectDocument>) { }

  create(req: Request) {
    if (req.body.length == 0) {
      return {
        code: 400,
        msg: "请传入数据"
      }
    } else {
      const body = {
        ...req.body,
        uuid: req.user.uuid,
        username: req.user.username,
        role: req.user.role
      }
      return this.subject.create(body)
    }

  }

  findAll() {
    //查询所有
    return this.subject.find().limit(10).sort({ _id: -1 }).exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
