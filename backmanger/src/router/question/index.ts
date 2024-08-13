import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question/index.vue'),
    },
    {
        path: 'question/create',
        name: 'question-create',
        component: () => import('@/views/question/create.vue'),
    }
]
export default routes