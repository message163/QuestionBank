import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { SubjectModule } from './subject/subject.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { RouteModule } from './route/route.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { GradeModule } from './grade/grade.module';

@Module({
  imports: [DbModule, UserModule, SubjectModule, CourseModule, AuthModule, RouteModule, KnowledgeModule, GradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
