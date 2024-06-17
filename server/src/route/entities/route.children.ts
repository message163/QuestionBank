import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class RouteChildren extends Document {

    @Prop({ required: true })
    title: string

    @Prop({ type: String })
    name: string

    @Prop({ type: String })
    path: string

    @Prop({ type: String })
    icon: string

    @Prop({ required: true })
    componentUrl: string;

    @Prop({ required: false })
    children: RouteChildren[]

    @Prop({ required: true })
    id: number;

    @Prop({ required: true, default: null })
    parentId: number | null;
}