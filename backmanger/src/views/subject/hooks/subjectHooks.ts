import { ref, computed } from 'vue'
import { gradeList, type SubList } from '@questionbank/config/grade/index.ts'
//只负责科目的逻辑
export const useSubject = () => {

    const isLast = computed(() => {
        return (index: number, len: number) => {
            return index == len
        }
    })
    const addSubject = (subList: SubList) => {
        subList.push({ name: '' })
    }

    const deleteSubject = (subList: SubList, index: number) => {
        subList.splice(index, 1)
    }
    return {
        isLast,
        addSubject,
        deleteSubject
    }
}