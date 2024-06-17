import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Authority } from '../../enum/authority';
import { RouteChildren } from './route.children';
@Schema()
export class Route {

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    order: number;

    @Prop({ required: false })
    icon: string;

    @Prop({ required: false })
    type: number;

    @Prop({ required: false, enum: Authority, default: Authority.GUEST })
    authority: Authority; 

    @Prop({ required: false })
    children: RouteChildren[];

    @Prop({ required: true })
    id: number;
}

export const tableName = 'Route'
export const RouteSchema = SchemaFactory.createForClass(Route)

export type RouteDocument = Route & Document