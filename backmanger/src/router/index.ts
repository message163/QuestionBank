import { createRouter, createWebHistory } from 'vue-router'
import Login from './login'
import Layout from '@/layout/index.vue'
import Course from './course'
import Home from './home'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...Login,
    {
      path: '/page',
      component: Layout,
      children: [
        ...Course, //课程
        ...Home //首页
      ]
    }
  ]
})

export default router
