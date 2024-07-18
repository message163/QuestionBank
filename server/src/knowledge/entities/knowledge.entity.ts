import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'
interface Tree {
    id: string
    label: string
    children: Tree[]
}

@Schema()
export class Knowledge {
    @Prop()
    subjectId: string

    @Prop()
    gradeId: string

    @Prop()
    gradeName: string

    @Prop({ type: Object })
    TreeKnowledge: Tree
}

export const KnowledgeSchema = SchemaFactory.createForClass(Knowledge)
export const tableName = 'Knowledge'
export type KnowledgeDocument = Knowledge & Document