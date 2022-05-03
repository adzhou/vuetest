import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Hot from '@/views/Hot'
import Rank from '@/views/Rank_new'

Vue.use(VueRouter)

/* Router Modules */
import tableRouter from './modules/table'
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/hot',
    name: 'hot',
    component: Hot
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  }
]


export const asyncRoutes = [
  tableRouter,
  { path: '*', redirect: '/404', hidden: true }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
