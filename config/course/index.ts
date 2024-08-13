
export interface CourseCodeItem {
    name: string
    desc: string
    _id?: string
    other?: string
    createTime: Date
    updateTime: Date
    uuid: string
    showpopover: boolean
}

export type CourseCodeList = CourseCodeItem[]
