import { type SubjectType, subjecetList } from '@questionbank/config/subject/index.ts'
import { getList } from '@/apis/subject';
import { ref } from 'vue'
import { page } from '@/config'
import { useCourseCode } from '../../course/code/hooks'
export interface Question {
    testSetNumber: string
    subjectCode: string
    type: SubjectType
    questionSetName: string
    knowledgeId: number[]
    score: number
    readingTime: number
    fastestSpeed: number
    slowestSpeed: number
    originalScore: number
    courseCode: string
    difficultyLevel: string
    username?: string
    role?: number
    uuid?: string
    version?: number
    content?: string
    data?: any[]
}
export const useInitObj = () => {
    const originObj: Question = {
        testSetNumber: '', //试卷编号
        questionSetName: '', //试卷名称
        subjectCode: '', //学科
        courseCode: '', //课程
        originalScore: 1, //原始分数
        fastestSpeed: 1, //最快速度
        slowestSpeed: 1, //最慢速度
        readingTime: 1, //阅读时间
        difficultyLevel: '', //难度等级
        knowledgeId: [], //关联知识点
        type: 1 as SubjectType, //类型
        score: 1, //分值
    }
    return window.structuredClone(originObj)
}

export const useSubjectList = () => {
    const data = ref<Question[]>([])
    const course = useCourseCode()
    const getSubjectList = async () => {
        const res = await getList<{ data: Question[] }>(page)
        data.value = res.data
    }
    const getCourseLabel = (id: string) => {
        return course.data.value.find((v) => v._id === id)?.name ?? ''
    }
    const findSubject = (type: SubjectType) => {
        console.log(type)
        return subjecetList.find((v) => v.value === type).label
    }
    const handleAnwer = (val: any) => {
        if (typeof val === 'string') {
            return val
        } else if (Array.isArray(val)) {
            return val.join(',')
        } else if (typeof val === 'number') {
            return val == 1 ? '正确' : '错误'
        } else {
            return val
        }
    }
    getSubjectList()
    return {
        data,
        getSubjectList,
        getCourseLabel,
        findSubject,
        handleAnwer
    }
}