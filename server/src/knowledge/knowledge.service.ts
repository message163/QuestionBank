import { Injectable } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { tableName, type KnowledgeDocument } from './entities/knowledge.entity'
@Injectable()
export class KnowledgeService {
  constructor(@InjectModel(tableName) private readonly knowledge: Model<KnowledgeDocument>) { }
  create(createKnowledgeDto: CreateKnowledgeDto) {
    return this.knowledge.create(createKnowledgeDto)
  }

  findAll() {
    return this.knowledge.find()
  }

  findOne(id: string) {
    return this.knowledge.findOne({ subjectId: id }) 
  }

  update(id: string, updateKnowledgeDto: UpdateKnowledgeDto) {
    return this.knowledge.updateOne({ subjectId: id }, updateKnowledgeDto)
  }

  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
