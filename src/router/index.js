import axios from 'axios';
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

import ProductShow from '../views/Products/show.vue';
import ProductEdit from '../views/Products/edit.vue';
import ProductIndex from '../views/Products/Index.vue';
import ProductCreate from '../views/Products/create.vue';

import SizeShow from '../views/Sizes/show.vue';
import SizeEdit from '../views/Sizes/edit.vue';
import SizeIndex from '../views/Sizes/Index.vue';
import SizeCreate from '../views/Sizes/create.vue';

import ColorEdit from '../views/Colors/edit.vue';
import ColorsIndex from '../views/Colors/Index.vue';
import ColorCreate from '../views/Colors/create.vue';

import CuponShow from '../views/Cupons/show.vue';
import CuponEdit from '../views/Cupons/edit.vue';
import CuponIndex from '../views/Cupons/Index.vue';
import CuponCreate from '../views/Cupons/create.vue';

import ImageEdit from '../views/Images/edit.vue';
import ImageIndex from '../views/Images/Index.vue';
import ImageCreate from '../views/Images/create.vue';

import BannerShow from '../views/Banner/show.vue';
import BannerEdit from '../views/Banner/edit.vue';
import BanderIndex from '../views/Banner/Index.vue';
import BannerCreate from '../views/Banner/create.vue';

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
  {
    path: '/product/create',
    name: 'product-create',
    component: ProductCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/product/show/:id',
    name: 'product-show',
    component: ProductShow,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/product/edit/:id',
    name: 'product-edit',
    component: ProductEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/size/index',
    name: 'size-index',
    component: SizeIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/size/show/:id',
    name: 'size-show',
    component: SizeShow,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/size/create',
    name: 'size-create',
    component: SizeCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/size/edit/:id',
    name: 'size-edit',
    component: SizeEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/color/index',
    name: 'color-index',
    component: ColorsIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/color/create',
    name: 'color-create',
    component: ColorCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/color/edit/:id',
    name: 'color-edit',
    component: ColorEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/cupon/index',
    name: 'cupon-index',
    component: CuponIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/cupon/create',
    name: 'cupon-create',
    component: CuponCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/cupon/show/:id',
    name: 'cupon-show',
    component: CuponShow,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/cupon/edit/:id',
    name: 'cupon-edit',
    component: CuponEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/image/index',
    name: 'image-index',
    component: ImageIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/image/create',
    name: 'image-create',
    component: ImageCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/image/edit/:id',
    name: 'image-edit',
    component: ImageEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/banner/index',
    name: 'banner-index',
    component: BanderIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/banner/show/:id',
    name: 'banner-show',
    component: BannerShow,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/banner/create',
    name: 'banner-create',
    component: BannerCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/banner/edit/:id',
    name: 'banner-edit',
    component: BannerEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
]

async function isAuthorized() {
  const token = localStorage.getItem('token');
  if (!token) return '/signin';

  try {
    const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    const currentDate = new Date();
    const expiresInDate = new Date(res.data.expiresInDate);

    if (expiresInDate < currentDate) {
      localStorage.removeItem('token');
      return '/signin';
    }

    return null; // No redirection needed if authorized
  } catch (error) {
    console.log(error);
    return '/signin';
  }
}

async function isSuperAdmin() {
  const redirect = await isAuthorized();
  if (redirect) return redirect;

  try {
    const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
      }
    });

    if (res.data.role.id !== 3) return '/signin';
  } catch (error) {
    console.log(error);
    return '/signin';
  }
}

async function isAdmin() {
  const redirect = await isAuthorized();
  if (redirect) return redirect;

  try {
    const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
      }
    });

    if (res.data.role.id !== 2) return '/signin';
  } catch (error) {
    console.log(error);
    return '/signin';
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const redirect = await isAuthorized();
    if (redirect) return next(redirect);
  }

  if (to.meta.requiresSuperAdmin) {
    const redirect = await isSuperAdmin();
    if (redirect) return next(redirect);
  }

  if (to.meta.requiresAdmin) {
    const redirect = await isAdmin();
    if (redirect) return next(redirect);
  }

  next();
});

export default router;



// async function isAuthorized () {
//   if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined )  return '/signin';

//   try {
//     const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
//       headers: {
//         Authorization: 'Bearer '+localStorage.getItem('token'),
//         Accept: 'application/json'
//       }
//     });

//     const currentDate = new Date();

//     const expiresInDate = res.data.expiresInDate;

//     const isExpired = expiresInDate < currentDate;

//     if (isExpired) {
//       localStorage.removeItem('token');

//       return '/signin';
//     }
//   } catch (error) {
//     console.log(error);

//     return '/signin';
//   }
// }

// async function isSuperAdmin () {
//   isAuthorized();

//   const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
//     headers: {
//       Authorization: 'Bearer '+localStorage.getItem('token'),
//       Accept: 'application/json'
//     }
//   });

//   if (res.data.role.id != 3) return '/signin';
// }

// async function isAdmin () {
//   isAuthorized();

//   const res = await axios.get('http://localhost:8000/api/users/find_by_token', {
//     headers: {
//       Authorization: 'Bearer '+localStorage.getItem('token'),
//       Accept: 'application/json'
//     }
//   });

//   if (res.data.role.id != 2) return '/signin';
// }

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })  