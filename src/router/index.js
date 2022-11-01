import { createRouter, createWebHistory } from 'vue-router'
import MoviesLayout from '../views/Movies/MoviesLayout.vue'
import HomeMovies from '../views/Movies/HomeMovies.vue'
import DetailMovies from '../views/Movies/DetailMovies.vue'

const routes = [
  {
    path: '/',
    component: MoviesLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeMovies
      },
      {
        path: '/detail',
        name: 'detail',
        component: DetailMovies
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
