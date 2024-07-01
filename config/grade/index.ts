export const gradeList = [
    {
        label: '小学',
        value: 1
    },
    {
        label: '初中',
        value: 2
    },
    {
        label: '高中',
        value: 3
    },
    {
        label: '中专',
        value: 4
    },
    {
        label: '大学',
        value: 5
    },
    {
        label: '大专',
        value: 6
    },
    {
        label: '硕士',
        value: 7
    },
    {
        label: '博士',
        value: 8
    }
]


type GradeList = typeof gradeList

type GradeValue = GradeList[number]['value']

export interface Subject {
    name: string
    id?: string
}

export interface KnowledgeSubject extends Subject {
    id: string
}

export type SubList = Subject[]
export type KnowledgeSublist = KnowledgeSubject[]
export interface Grade {
    grade: GradeValue | undefined | null
    subject: SubList
    _id?: string
    showpopover?: boolean
}

export interface Knowledge {
    grade: GradeValue | undefined | null
    subject: KnowledgeSublist
    _id: string
}

export type KnowledgeForm = Knowledge[]

export type GradeForm = Grade[]