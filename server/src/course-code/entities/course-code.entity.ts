import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class CourseCode {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    desc: string

    @Prop({ required: false, default: "" })
    other: string

    @Prop({required: true, default: Date.now()})
    createTime: string

    @Prop({required: true, default: Date.now()})
    updateTime: string
    
    @Prop({required: true, default: 0})
    uuid: string
}

export const CourseCodeSchema = SchemaFactory.createForClass(CourseCode)
export const TableName  = 'CourseCode'
export type CourseCodeDocument = CourseCode & Document