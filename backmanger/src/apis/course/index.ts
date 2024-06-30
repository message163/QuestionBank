import http from '..'

export const createCourse = async <T = any>(ruleForm: any): Promise<T> => {
    return (await http.post<T>('/api/course/create', ruleForm)).data
}

export const getCourseList = async <T = any>(params: any): Promise<T> => {
    return (await http.get<T>('/api/course/list', { params })).data
}

export const updateCourse = async <T = any>(data: any): Promise<T> => {
    return (await http.patch<T>(`/api/course/update/${data._id}`,data)).data
}

export const deleteCourse = async <T = any>(data: any): Promise<T> => {
    return (await http.delete<T>(`/api/course/delete/${data._id}`)).data
}

export const importExcelUrl = '/fs/course/upload/excel'