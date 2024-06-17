declare module Express {
    interface User {
        uuid: string
        role: number
    }
    export interface Request {
        user: User
    }
}