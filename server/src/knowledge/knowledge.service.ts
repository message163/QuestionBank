import { Injectable } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';

@Injectable()
export class KnowledgeService {
  create(createKnowledgeDto: CreateKnowledgeDto) {
    return 'This action adds a new knowledge';
  }

  findAll() {
    return `This action returns all knowledge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledge`;
  }

  update(id: number, updateKnowledgeDto: UpdateKnowledgeDto) {
    return `This action updates a #${id} knowledge`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
