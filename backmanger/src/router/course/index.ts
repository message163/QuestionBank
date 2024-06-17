import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'course',
        name: 'course',
        component: () => import('@/views/course/index.vue')
    }
]
export default routes