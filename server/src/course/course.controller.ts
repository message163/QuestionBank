import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, Query as Params } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('create')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get('list')
  async findAll(@Query() query: Params) {
    return await this.courseService.findAll(query);
  }


  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
