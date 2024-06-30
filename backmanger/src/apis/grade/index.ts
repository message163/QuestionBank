import http from '..'

export const createGrade = async <T = any>(data: any): Promise<T> => {
    return (await http.post<T>('/api/grade/create', data)).data
}

export const getList = async <T = any>(params?: any): Promise<T> => {
    return (await http.get<T>('/api/grade/list', { params })).data
}

export const deleteGrade = async <T = any>(data: any): Promise<T> => {
    return (await http.delete<T>(`/api/grade/delete/${data._id}`)).data
}

export const updateGrade = async <T = any>(data: any): Promise<T> => {
    return (await http.patch<T>(`/api/grade/update/${data._id}`, data)).data
}