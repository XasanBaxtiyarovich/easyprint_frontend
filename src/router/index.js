import { createRouter, createWebHistory } from 'vue-router';

import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';

import UserEdit from '../views/Users/edit.vue';
import UserINdex from '../views/Users/Index.vue';
import UserCreate from '../views/Users/create.vue';
import MyAccount from '../views/Users/myAccount.vue';

import RoleEdit from '../views/Roles/edit.vue';
import RoleIndex from '../views/Roles/Index.vue';
import RoleCreate from '../views/Roles/create.vue';

import CompanyEdit from '../views/Companies/edit.vue';
import CompanyIndex from '../views/Companies/Index.vue';
import CompanyCreate from '../views/Companies/create.vue';

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
  },
  {
    path: '/role/index',
    name: 'role-index',
    component: RoleIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/role/create',
    name: 'role-create',
    component: RoleCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/role/edit/:id',
    name: 'role-edit',
    component: RoleEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/index',
    name: 'company-index',
    component: CompanyIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/create',
    name: 'company-create',
    component: CompanyCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/edit/:id',
    name: 'company-edit',
    component: CompanyEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
]

function isAuthorized () {
  if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined )  return '/signin';
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;