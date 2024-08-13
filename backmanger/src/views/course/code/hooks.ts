import { getCourseCodeList } from '@/apis/course/code'
import { ref } from 'vue'
import type { CourseCodeList, CourseCodeItem } from '@questionbank/config/course/index.ts'
export const useCourseCode = () => {
    let data = ref<CourseCodeList>([])
    const getList = async () => {
        const res = await getCourseCodeList<{ data: CourseCodeList }>({})
        res.data.forEach((item: CourseCodeItem) => {
            item.showpopover = false
        })
        data.value = res.data
    }
    getList()
    return {
        getList,
        data
    }
}