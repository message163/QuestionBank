import { ref, computed, reactive } from 'vue'
import { gradeList, type GradeForm,type Grade } from '@questionbank/config/grade/index.ts'

export const useGrade = () => {

    let formData = reactive({
        gradeList: [
            {
                grade: gradeList[0].value,
                subject: [{ name: '' }],
                _id: ''
            },
        ]
    })


    const resetForm = () => {
        formData.gradeList = [
            {
                grade: gradeList[0].value,
                subject: [{ name: '' }],
                _id: ''
            },
        ]
    }

    const addGrade = (form: GradeForm) => {
        form.push({
            grade: null,
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

    //选过的就不能再选
    const disableGrade = computed(() => {
        return formData.gradeList.map((item) => {
            return item.grade
        }).filter((item) => {
            return item
        })
    })

    return {
        disableGrade,
        formData,
        addGrade,
        deleteGrade,
        isFirstGrade,
        isLastGrade,
        resetForm,
    }
}