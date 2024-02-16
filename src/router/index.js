import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Cookies from 'js-cookie';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!Cookies.get('isLogin')) {
          localStorage.removeItem('is$$Login$$xxm&&ccb')
          next('/login')
        } else {
          if (!Cookies.get('session')) {
            Cookies.set('session', localStorage.getItem('is$$Login$$xxm&&ccb'))
          }
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
