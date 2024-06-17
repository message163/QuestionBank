import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        alias: '/login',
        component: Login
    }
]
export default routes