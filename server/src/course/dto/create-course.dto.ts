export class CreateCourseDto {
    stage: number //阶段

    semester: number //学期

    unit: number //单元

    chapter: number //章节

    createTime: string //创建时间

    updateTime: string //更新时间

    courseId: number //课程编号

    courseNumberd: number //课号

    courseName: string // 课程名称

    author: string // 课程作者

    courseCategories: string // 课程分类

    lessonType: string // 课程类型

    writingStyle: string //文体

    languageStyle: string //语体
}


export interface Page {
    pageNo: number
    pageSize: number
}

export interface Query extends Page {
   keyWord:string
}