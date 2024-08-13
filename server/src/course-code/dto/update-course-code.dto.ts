import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCodeDto } from './create-course-code.dto';

export class UpdateCourseCodeDto extends PartialType(CreateCourseCodeDto) {}
