import http from '..'
export const createKnowledge = async <T = any>(data: any): Promise<T> => {
    return (await http.post<T>('/api/knowledge/create', data)).data
}

export const getList = async <T = any>(params: any): Promise<T> => {
    return (await http.get<T>(`/api/knowledge/list/${params.subjectId}`, { params })).data
}

export const updateKnowledge = async <T = any>(data: any): Promise<T> => {
    return (await http.patch<T>(`/api/knowledge/update/${data.subjectId}`, data)).data
}