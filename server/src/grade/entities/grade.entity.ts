import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import type { Document } from 'mongoose'
import { SubList } from '@questionbank/config/grade'


@Schema()
export class Grade {
    @Prop({ required: true })
    grade: number

    @Prop({ type: Object })
    subject: SubList

    @Prop({ default: Date.now() })
    createTime: string

    @Prop({ default: Date.now() })
    updateTime: string
}

export const GradeSchema = SchemaFactory.createForClass(Grade) //存储数据库方法
export const TableName = 'Grade' //数据库的名字

export type GradeDocument = Grade & Document //数据库类型
