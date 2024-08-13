import type { SubjectType, AwnsersType, Awnsers } from '@questionbank/config/subject/index.ts'
import { getList } from '@/apis/subject';
import { ref } from 'vue'
import { page } from '@/config'
import { useCourseCode } from '../../course/code/hooks'
export interface Question {
    subjectCode: string
    type: SubjectType
    awnsers: Awnsers
    analysis: string
    knowledgeId: number[]
    score: number
    degree: number
    options: string
    testDescription: string
    answeringRequirements: string
    pictureAddress: string
    audioAddress: string
    videoAddress: string
    selectedArticleAddress: string
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
}
export const useInitObj = () => {
    const originObj: Question = {
        subjectCode: '', //学科
        courseCode: '', //课程
        originalScore: 1, //原始分数
        fastestSpeed: 1, //最快速度
        slowestSpeed: 1, //最慢速度
        readingTime: 1, //阅读时间
        difficultyLevel: '', //难度等级
        knowledgeId: [], //关联知识点
        selectedArticleAddress: '', //选中文章
        pictureAddress: '', //图片地址
        audioAddress: '', //音频地址
        videoAddress: '', //视频地址
        answeringRequirements: '', //答题要求
        testDescription: '', //试题描述
        type: 1 as SubjectType, //类型
        awnsers: {
            type: 1 as SubjectType,
            content: '' as AwnsersType
        }, //答案
        options: '', //选项
        analysis: '', //解析
        score: 1, //分值
        degree: 1, //难度
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
    getSubjectList()
    return {
        data,
        getSubjectList,
        getCourseLabel
    }
}