import { ref, computed } from 'vue'
import { gradeList, type GradeForm } from '@questionbank/config/grade/index.ts'
import { createGrade } from '@/apis/grade'
export const useGrade = () => {

    const addGrade = (form: GradeForm) => {
        form.push({
            grade: gradeList[0].value,
            subject: [{ name: '' }]
        })
    }
    const deleteGrade = (form: GradeForm, index: number) => {
        form.splice(index, 1)
    }

    const isFirstGrade = computed(() => {
        return (index: number) => {
            return index != 0
        }
    })

    const isLastGrade = computed(() => {
        return (index: number, Len: number) => {
            return index == Len
        }
    })

    const submit = (form: GradeForm) => {
        createGrade(form)
    }

    return {
        addGrade,
        deleteGrade,
        isFirstGrade,
        isLastGrade,
        submit
    }
}