import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CourseCodeService } from './course-code.service';
import { CreateCourseCodeDto } from './dto/create-course-code.dto';
import { UpdateCourseCodeDto } from './dto/update-course-code.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
@Controller('course-code')
export class CourseCodeController {
  constructor(private readonly courseCodeService: CourseCodeService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Req() req: Request) {
    return this.courseCodeService.create(req);
  }

  @Get('/list')
  findAll() {
    return this.courseCodeService.findAll();
  }


  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCourseCodeDto: UpdateCourseCodeDto) {
    return this.courseCodeService.update(id, updateCourseCodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.courseCodeService.remove(id);
  }
}
