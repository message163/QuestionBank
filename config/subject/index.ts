
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
        label: '作图题'
    },
    {
        value: 7,
        label: '作文'
    }
] as const

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

export const difficulty = [
    {
        label: 'd1',
        value: 1
    },
    {
        label: 'd2',
        value: 2
    },
    {
        label: 'd3',
        value: 3
    },
    {
        label: 'o1',
        value: 4
    },
    {
        label: 'o2',
        value: 5
    },
    {
        label: 'o3',
        value: 6
    },
    {
        label: 'p1',
        value: 7
    },
    {
        label: 'p2',
        value: 8
    },
    {
        label: 'p3',
        value: 9
    }
]



export class Content {
    text: string
    value: string
    isAnswer: boolean
}

export type SubjectType = typeof subjecetList[number]['value']

export type AwnsersType = string | number | Content[]

export class Awnsers {
    type: SubjectType
    content: AwnsersType
}

