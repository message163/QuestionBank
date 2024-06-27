import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeDto } from './create-knowledge.dto';

export class UpdateKnowledgeDto extends PartialType(CreateKnowledgeDto) {}
