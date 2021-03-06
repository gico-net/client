import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Commit from '@/views/Commit.vue'
import Repository from '@/views/Repository.vue'
import Search from '@/views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/commit/:hash',
    name: 'Commit',
    component: Commit,
    props: true
  },
  {
    path: '/repo/:user/:name',
    name: 'Repository',
    component: Repository,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
