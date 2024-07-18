export interface User {
    username: string
    account: string
    password: string
    age?: number
    role: number
    leval: UserLeval
}

export interface UserList extends User {
    _id: string
    uuid: string
    showpopover?: boolean
}

export enum UserLeval {
    admin = 1, //管理员
    director = 2, //校长 主任
    teacher = 3, //教师
    student = 4, //学生
    guest = 5 //游客 客人
}

export const userLevalList = [
    { id: UserLeval.admin, name: '管理员' },
    { id: UserLeval.director, name: '主任' },
    { id: UserLeval.teacher, name: '教师' },
    { id: UserLeval.student, name: '学生' },
    { id: UserLeval.guest, name: '游客' }
]
