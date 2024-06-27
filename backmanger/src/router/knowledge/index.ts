import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/knowledge/index.vue')
    }
]
export default routes