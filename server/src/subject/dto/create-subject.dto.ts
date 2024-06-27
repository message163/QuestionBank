import type { SubjectType, AwnsersType, Awnsers } from '@questionbank/config/subject/index.ts'
export class CreateSubjectDto {
    title: string
    type: SubjectType
    awnsers: Awnsers
    analysis: string
    difficulty: number
    category: number
    source: Array<string>
} []
