import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { SubjectType, Awnsers } from '@questionbank/config/subject'
@Schema()
export class Subject {

    @Prop()
    title: string

    @Prop()
    type: SubjectType

    @Prop({ type: Object })
    awnsers: Awnsers

    @Prop()
    analysis: string

    @Prop()
    difficulty: number

    @Prop({ default: new Date() })
    createTime: string

    @Prop({ default: new Date() })
    updateTime: string

    @Prop()
    category: number

    @Prop({ type: Array, default: [] })
    source: Array<string>
}

export const SubjectSchema = SchemaFactory.createForClass(Subject)
export const TableName = 'Subject'

export type SubjectDocument = Subject & Document