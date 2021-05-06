import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../views/details.vue')
  },
  {
    path: '/comicView',
    name: 'comicView',
    component: () => import('../views/comicView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // base:'comic'
})

export default router
