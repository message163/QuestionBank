import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { SubjectType, Awnsers } from '@questionbank/config/subject'
@Schema()
export class Subject {

    @Prop()
    testSetNumber: string //试卷编号

    @Prop()
    questionSetName: string //试卷名称

    @Prop()
    subjectCode: string //学科

    @Prop()
    type: SubjectType //类型

    @Prop({ type: Array })
    knowledgeId: number[] //关联知识点

    @Prop()
    courseCode: string //课程

    @Prop({ default: Date.now() })
    createTime: string //创建时间

    @Prop({ default: Date.now() })
    updateTime: string //更新时间

    @Prop()
    score: number //分值

    @Prop()
    originalScore: number //原始分数

    @Prop()
    source: number //终分数

    @Prop()
    fastestSpeed: number //最快速度

    @Prop()
    slowestSpeed: number //最慢速度

    @Prop()
    readingTime: number //阅读时间

    @Prop()
    difficultyLevel: string //难度等级

    @Prop()
    degree: number //难度

    @Prop()
    uuid: string //uuid

    @Prop({ default: 1 })
    version: number

    @Prop()
    username: string //用户名

    @Prop()
    role: number //角色

    @Prop()
    content: string //题目内容

    @Prop({ type: Array })
    data: any[]


}

export const SubjectSchema = SchemaFactory.createForClass(Subject)
export const TableName = 'Subject'

export type SubjectDocument = Subject & Document