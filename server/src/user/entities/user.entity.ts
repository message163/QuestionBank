import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Authority } from '../../enum/authority';
@Schema()
export class User {

    @Prop({ required: true })
    uuid: string

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    account: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: Date.now })
    createTime: string;

    @Prop({ required: true, default: Date.now })
    updateTime: string;

    @Prop({ required: false })
    age: number;

    @Prop({ required: true, enum: Authority, default: Authority.USER })
    role: Authority;
}
//schema
export const UserSchema = SchemaFactory.createForClass(User)
export const TableName = 'User'
//type
export type UserDocument = User & Document