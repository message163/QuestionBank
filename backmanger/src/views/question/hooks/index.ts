import type { SubjectType, AwnsersType } from '@questionbank/config/subject/index.ts'

export const useInitObj = () => {
    const originObj = {
        title: '', //标题
        type: 1 as SubjectType, //类型
        awnsers: {
            type: 1 as SubjectType,
            content: '' as AwnsersType
        }, //答案
        source: [], //type 1 图片 2 音频  url 地址
        analysis: '', //解析
        difficulty: 1, //难度
        category: 1, //科目
        score: 1, //分值
        time: 1, //答题时间
        degree: 1, //难度
    }
    return window.structuredClone(originObj)
}