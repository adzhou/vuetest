import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Hot from '@/views/Hot'
import Rank from '@/views/Rank_new'

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
