import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Authentification/Login.vue';
import Logout from '../views/Authentification/Logout.vue';
import Signup from '../views/Authentification/Signup.vue';
import Home from '../views/Home.vue';
import Area from '../views/Area.vue';
import Launch from '../views/Launch.vue';
import ReactivityPage from '../views/Reactivity.vue';
import Logs from '../views/Logs.vue';
import authGoogle from '../views/GoogleRedirect.vue'
import RedditAuth from '../views/Reddit.vue';
import Plans from '../views/Plans.vue';
import ApkPage from '../views/Apk.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/authGoogle',
    name: 'authGoogle',
    component: authGoogle
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/area',
    name: 'area',
    component: Area
  },
  {
    path: '/',
    name: 'launch',
    component: Launch
  },
  {
    path: '/reactivity',
    name: 'reactivity',
    component: ReactivityPage
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs
  },
  {
    path: '/reddit/callback',
    name: 'reddit',
    component: RedditAuth
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/client.apk',
    name: 'ApkPage',
    component: ApkPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
