import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post('/create')
  create(@Body() createKnowledgeDto: CreateKnowledgeDto) {
    return this.knowledgeService.create(createKnowledgeDto);
  }

  @Get('/list')
  findAll() {
    return this.knowledgeService.findAll();
  }

  @Get('/list/:id')
  findOne(@Param('id') id: string) {
    return this.knowledgeService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateKnowledgeDto: UpdateKnowledgeDto) {
    return this.knowledgeService.update(id, updateKnowledgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knowledgeService.remove(+id);
  }
}
