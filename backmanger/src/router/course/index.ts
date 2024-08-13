import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'course',
        name: 'course',
        component: () => import('@/views/course/index.vue')
    },
    {
        path: 'course/code',
        name: 'course-code',
        component: () => import('@/views/course/code/index.vue')
    }
]
export default routes