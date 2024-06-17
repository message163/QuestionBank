import http from '..'

export const getRouters = async <T = any>(): Promise<T> => {
    return (await http.get<T>('/api/route/list')).data
}