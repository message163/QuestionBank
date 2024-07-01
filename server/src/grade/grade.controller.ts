import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto, type Query as Params } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) { }

  @Post('create')
  async create(@Body() createGradeDto: CreateGradeDto) {
    return await this.gradeService.create(createGradeDto);
  }

  @Get('list')
  findAll(@Query() query: Params) {
    return this.gradeService.findAll(query);
  }


  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(id, updateGradeDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(id);
  }
}
