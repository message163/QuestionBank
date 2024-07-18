import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
    }
]
export default routes