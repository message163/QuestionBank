import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Course {

    @Prop({ required: true })
    stage: number //阶段

    @Prop({ required: true })
    semester: number //学期

    @Prop({ required: true })
    unit: number //单元

    @Prop({ required: true })
    chapter: number //章节

    @Prop({ required: true, default: Date.now() })
    createTime: string //创建时间

    @Prop({ required: true, default: Date.now() })
    updateTime: string //更新时间

    @Prop({ required: true })
    courseId: number //课程编号

    @Prop({ required: true })
    courseNumberd: number //课号

    @Prop({ required: true })
    courseName: string // 课程名称

    @Prop({ required: true })
    author: string // 课程作者

    @Prop({ required: true })
    courseCategories: string // 课程分类

    @Prop({ required: true })
    lessonType: string // 课程类型

    @Prop({ required: true })
    writingStyle: string //文体

    @Prop({ required: true })
    languageStyle: string //语体
}

export const CourseSchema = SchemaFactory.createForClass(Course)
export const TableName = 'Course'
export type CourseDocument = Course & Document
