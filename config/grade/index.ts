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
}

export type SubList = Subject[]


export interface Grade {
    grade:GradeValue
    subject:SubList
}

export type GradeForm = Grade[]