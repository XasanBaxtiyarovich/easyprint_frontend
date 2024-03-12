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

import CategoryEdit from '../views/Categories/edit.vue';
import CategoryINdex from '../views/Categories/Index.vue';
import CategoryCreate from '../views/Categories/create.vue';

import SubCategoryEdit from '../views/SubCategory/edit.vue';
import SubCategoryIndex from '../views/SubCategory/Index.vue';
import SubCategoryCreate from '../views/SubCategory/create.vue';

import ProductIndex from '../views/Products/Index.vue';

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
  {
    path: '/category/index',
    name: 'category-index',
    component: CategoryINdex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: CategoryCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/category/edit/:id',
    name: 'category-edit',
    component: CategoryEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/sub-category/index',
    name: 'sub-category-index',
    component: SubCategoryIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/sub-category/create',
    name: 'sub-category-create',
    component: SubCategoryCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/sub-category/edit/:id',
    name: 'sub-category-edit',
    component: SubCategoryEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/product/index',
    name: 'product-index',
    component: ProductIndex,
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