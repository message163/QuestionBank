import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'subject',
        name: 'subject',
        component: () => import('@/views/subject/index.vue')
    }
]
export default routes