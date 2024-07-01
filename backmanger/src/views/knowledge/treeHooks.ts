import { getList } from '@/apis/grade/index'
import { gradeList, type Knowledge } from '@questionbank/config/grade/index.ts'
import { ref } from 'vue'
export const useTreeHooks = () => {

    const list = ref<Knowledge[]>([])
    const getGradeList = async () => {
        const data = await getList<{ data: { data: Knowledge[], total: number } }>({ pageNo: 1, pageSize: gradeList.length })
        const gradeLists: Knowledge[] = data.data.data
        gradeLists.forEach((item: Knowledge) => {
            item.subject.forEach((v) => {
                v.id = `${item._id}-${v.name}`
            })
        })
        list.value = gradeLists
    }
    const getLabel = (item: Knowledge) => {
        return gradeList.find((v) => v.value === item.grade)?.label
    }
    getGradeList()
    return {
        list,
        getLabel
    }
}