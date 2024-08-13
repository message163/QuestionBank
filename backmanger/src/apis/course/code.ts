import http from '..'

export const createCourseCode = async <T = any>(ruleForm: any): Promise<T> => {
    return (await http.post<T>('/api/course-code/create', ruleForm)).data
}

export const getCourseCodeList = async <T = any>(params: any): Promise<T> => {
    return (await http.get<T>('/api/course-code/list', { params })).data
}

export const updateCourseCode = async <T = any>(data: any): Promise<T> => {
    return (await http.patch<T>(`/api/course-code/update/${data._id}`,data)).data
}

export const deleteCourseCode = async <T = any>(data: any): Promise<T> => {
    return (await http.delete<T>(`/api/course-code/delete/${data._id}`)).data
}