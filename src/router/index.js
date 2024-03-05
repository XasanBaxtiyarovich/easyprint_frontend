import { createRouter, createWebHistory } from 'vue-router';

import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';

import UserEdit from '../views/Users/edit.vue';
import UserINdex from '../views/Users/Index.vue';
import UserCreate from '../views/Users/create.vue';
import MyAccount from '../views/Users/myAccount.vue';


const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/signin',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: UserCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/user/edit/:id',
    name: 'user-edit',
    component: UserEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/user/index',
    name: 'user-index',
    component: UserINdex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/accountsettings/account',
    name: 'account-settings',
    component: MyAccount,
    beforeEnter(){
      return isAuthorized()
    }
  }, 
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    beforeEnter(){
      return isAuthorized()
    }
  }
]

function isAuthorized () {
  if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined )  return '/signin';
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;