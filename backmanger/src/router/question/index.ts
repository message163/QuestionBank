import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question/index.vue')
    }
]
export default routes