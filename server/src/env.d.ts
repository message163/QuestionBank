declare module Express {
    interface User {
        uuid: string
        role: number
        username: string
    }
    export interface Request {
        user: User
    }
}