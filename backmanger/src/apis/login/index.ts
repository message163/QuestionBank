import http from '..'
export const getCode = async <T = any>(): Promise<T> => {
    return (await http.get<T>('/api/user/code', { responseType: 'text' })).data
}

export const login = async <T = any>(ruleForm: any): Promise<T> => {
    return (await http.post<T>('/api/user/login', ruleForm)).data
}