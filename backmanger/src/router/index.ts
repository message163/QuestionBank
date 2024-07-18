import { createRouter, createWebHistory } from 'vue-router'
import Login from './login'
import Layout from '@/layout/index.vue'
import Course from './course'
import Home from './home'
import question from './question'
import knowledge from './knowledge'
import subject from './subject'
import user from './user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...Login,
    {
      path: '/page',
      component: Layout,
      children: [
        ...Course, //课程
        ...Home, //首页
        ...question,
        ...knowledge,
        ...subject,
        ...user
      ]
    }
  ]
})

export default router
