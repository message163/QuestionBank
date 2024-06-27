
export const subjecetList = [
    {
        value: 1,
        label: '单选题'
    },
    {
        value: 2,
        label: '多选题'
    },
    {
        value: 3,
        label: '判断题'
    },
    {
        value: 4,
        label: '填空题'
    },
    {
        value: 5,
        label: '问答题'
    },
    {
        value: 6,
        label: '听力题'
    }
]

export const categoryList = [
    {
        value: 1,
        label: '语文'
    },
    {
        value: 2,
        label: '数学'
    },
    {
        value: 3,
        label: '英语'
    },
    {
        value: 4,
        label: '物理'
    },
    {
        value: 5,
        label: '化学'
    },
    {
        value: 6,
        label: '生物'
    },
    {
        value: 7,
        label: '地理'
    },
    {
        value: 8,
        label: '历史'
    },
    {
        value: 9,
        label: '政治'
    },
    {
        value: 10,
        label: '体育'
    },
    {
        value: 11,
        label: '美术'
    },
    {
        value: 12,
        label: '音乐'
    },
    {
        value: 13,
        label: '其他'
    }
]

export class Content {
    text: string
    value: string
    isAnswer: boolean
}

export type SubjectType = 1 | 2 | 3 | 4 | 5 | 6

export type AwnsersType = string | number | Content[]

export class Awnsers {
    type: SubjectType
    content: AwnsersType
}

