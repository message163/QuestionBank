import { Module } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnowledgeSchema, tableName } from './entities/knowledge.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: tableName, schema: KnowledgeSchema }])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
})
export class KnowledgeModule { }
