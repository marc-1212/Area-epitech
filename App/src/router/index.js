import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/Authentification/Login.vue')
      },
      {
        path: 'logout',
        component: () => import('@/views/Authentification/Logout.vue')
      },
      {
        path: 'signup',
        component: () => import('@/views/Authentification/Signup.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'reactivity',
        component: () => import('@/views/Reactivity.vue')
      },
      {
        path: 'logs',
        component: () => import('@/views/Logs.vue')
      },
      {
        path: 'reddit/callback',
        component: () => import('@/views/Reddit.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Authentification/Login.vue')
  },
  {
    path: '/logout',
    component: () => import('@/views/Authentification/Logout.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/Authentification/Signup.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/reactivity',
    component: () => import('@/views/Reactivity.vue')
  },
  {
    path: '/logs',
    component: () => import('@/views/Logs.vue')
  },
  {
    path: '/reddit/callback',
    component: () => import('@/views/Reddit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
