import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    }
]
export default routes