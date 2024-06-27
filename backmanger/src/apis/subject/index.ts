import http from '..'

export const createSubject = async <T = any>(data: any): Promise<T> => {
    return (await http.post<T>('/api/subject/create', data)).data
}

export const getList = async <T = any>(params: any): Promise<T> => {
    return (await http.get<T>('/api/subject/list', { params })).data
}