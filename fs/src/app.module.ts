import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose'
import { MongodbUrl } from '@questionbank/config/database';
@Module({
  imports: [MongooseModule.forRoot(MongodbUrl),CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
