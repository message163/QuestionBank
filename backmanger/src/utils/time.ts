import dayjs from 'dayjs'
import type { App } from 'vue'

//可以在任何地方使用
export const timeFormat = (time: number) => {
    return dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss')
}
//注册全局可以通过vue调用
export const installTimeformat = (app: App) => {
    app.config.globalProperties.$timeFormat = timeFormat
}
//声明文件扩充
declare module 'vue' {
    interface ComponentCustomProperties {
        $timeFormat: typeof timeFormat
    }
}