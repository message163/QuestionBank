import http from '..'


export const getUserList = async <T = any>(params?: any): Promise<T> => {
    return (await http.get<T>(`/api/user/list/`, { params })).data
}

export const getAccount = async <T = any>(params?: any): Promise<T> => {
    return (await http.get<T>(`/api/user/account`, { params })).data
}

export const createUser = async <T = any>(data: any): Promise<T> => {
    return (await http.post<T>('/api/user/create', data)).data
}

export const updateUser = async <T = any>(data: any): Promise<T> => {
    return (await http.patch<T>(`/api/user/update/${data._id}`, data)).data
}

export const deleteUser = async <T = any>(data: any): Promise<T> => {
    return (await http.delete<T>(`/api/user/delete/${data._id}`)).data
}