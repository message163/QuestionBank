import http from '..'

export const createGrade = async <T = any>(data: any): Promise<T> => {
    return (await http.post<T>('/api/grade/create', data)).data
}

export const getList = async <T = any>(params?: any): Promise<T> => {
    return (await http.get<T>('/api/grade/list', { params })).data
}