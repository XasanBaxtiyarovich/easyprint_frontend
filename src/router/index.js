import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

import IndexView from '../views/IndexView.vue'
import Company from '../views/CompanyIndex.vue';
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';

import UserEdit from '../views/Users/edit.vue';
import UserShow from '../views/Users/show.vue';
import UserINdex from '../views/Users/Index.vue';
import UserCreate from '../views/Users/create.vue';
import MyAccount from '../views/Users/myAccount.vue';

import CompanyUserEdit from '../views/CompanyUsers/edit.vue';
import CompanyUserShow from '../views/CompanyUsers/show.vue';
import CompanyUserINdex from '../views/CompanyUsers/Index.vue';
import CompanyUserCreate from '../views/CompanyUsers/create.vue';

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

import DiscountShow from '../views/Discount/show.vue';
import DiscountEdit from '../views/Discount/edit.vue';
import DiscountIndex from '../views/Discount/Index.vue';
import DiscountCreate from '../views/Discount/create.vue';

import WarehouseShow from '../views/Warehouse/show.vue';
import WarehouseEdit from '../views/Warehouse/edit.vue';
import WarehouseIndex from '../views/Warehouse/Index.vue';
import WarehouseCreate from '../views/Warehouse/create.vue';
import WarehouseProducts from '../views/Warehouse/products.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/company',
    name: 'company',
    component: Company,
    beforeEnter(){
      return isAdmin()
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
      return isSuperAdmin()
    }
  },
  {
    path: '/user/edit/:id',
    name: 'user-edit',
    component: UserEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/user/index',
    name: 'user-index',
    component: UserINdex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/user/show/:id',
    name: 'user-show',
    component: UserShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/company/user/create',
    name: 'company-user-create',
    component: CompanyUserCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/user/edit/:id',
    name: 'company-user-edit',
    component: CompanyUserEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/user/index',
    name: 'company-user-index',
    component: CompanyUserINdex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/company/user/show/:id',
    name: 'company-user-show',
    component: CompanyUserShow,
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
      return isSuperAdmin()
    }
  },
  {
    path: '/role/create',
    name: 'role-create',
    component: RoleCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/role/edit/:id',
    name: 'role-edit',
    component: RoleEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/company/index',
    name: 'company-index',
    component: CompanyIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/company/create',
    name: 'company-create',
    component: CompanyCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/company/edit/:id',
    name: 'company-edit',
    component: CompanyEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/category/index',
    name: 'category-index',
    component: CategoryINdex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: CategoryCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/category/edit/:id',
    name: 'category-edit',
    component: CategoryEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/sub-category/index',
    name: 'sub-category-index',
    component: SubCategoryIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/sub-category/create',
    name: 'sub-category-create',
    component: SubCategoryCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/sub-category/edit/:id',
    name: 'sub-category-edit',
    component: SubCategoryEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/product/index',
    name: 'product-index',
    component: ProductIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/product/create',
    name: 'product-create',
    component: ProductCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/product/show/:id',
    name: 'product-show',
    component: ProductShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/product/edit/:id',
    name: 'product-edit',
    component: ProductEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/size/index',
    name: 'size-index',
    component: SizeIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/size/show/:id',
    name: 'size-show',
    component: SizeShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/size/create',
    name: 'size-create',
    component: SizeCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/size/edit/:id',
    name: 'size-edit',
    component: SizeEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/color/index',
    name: 'color-index',
    component: ColorsIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/color/create',
    name: 'color-create',
    component: ColorCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/color/edit/:id',
    name: 'color-edit',
    component: ColorEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/cupon/index',
    name: 'cupon-index',
    component: CuponIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/cupon/create',
    name: 'cupon-create',
    component: CuponCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/cupon/show/:id',
    name: 'cupon-show',
    component: CuponShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/cupon/edit/:id',
    name: 'cupon-edit',
    component: CuponEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/image/index',
    name: 'image-index',
    component: ImageIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/image/create',
    name: 'image-create',
    component: ImageCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/image/edit/:id',
    name: 'image-edit',
    component: ImageEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/banner/index',
    name: 'banner-index',
    component: BanderIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/banner/show/:id',
    name: 'banner-show',
    component: BannerShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/banner/create',
    name: 'banner-create',
    component: BannerCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/banner/edit/:id',
    name: 'banner-edit',
    component: BannerEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/discount/index',
    name: 'discount-index',
    component: DiscountIndex,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/discount/show/:id',
    name: 'discount-show',
    component: DiscountShow,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/discount/create',
    name: 'discount-create',
    component: DiscountCreate,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/discount/edit/:id',
    name: 'discount-edit',
    component: DiscountEdit,
    beforeEnter(){
      return isSuperAdmin()
    }
  },
  {
    path: '/warehouse/products',
    name: 'warehouse-products',
    component: WarehouseProducts,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/warehouse/:id',
    name: 'warehouse',
    component: WarehouseIndex,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/warehouse/create/:id',
    name: 'warehouse-create',
    component: WarehouseCreate,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/warehouse/show/:id',
    name: 'warehouse-show',
    component: WarehouseShow,
    beforeEnter(){
      return isAuthorized()
    }
  },
  {
    path: '/warehouse/edit/:id',
    name: 'warehouse-edit',
    component: WarehouseEdit,
    beforeEnter(){
      return isAuthorized()
    }
  },
]

async function isAuthorized() {
  const token = localStorage.getItem('token');
  if (!token) return '/signin';

  try {
    const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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
    const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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
    const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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

async function isManager() {
  const redirect = await isAuthorized();
  if (redirect) return redirect;

  try {
    const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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

  if (to.meta.requiresManager) {
    const redirect = await isManager();
    if (redirect) return next(redirect);
  }

  next();
});

export default router;



// async function isAuthorized () {
//   if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined )  return '/signin';

//   try {
//     const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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

//   const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
//     headers: {
//       Authorization: 'Bearer '+localStorage.getItem('token'),
//       Accept: 'application/json'
//     }
//   });

//   if (res.data.role.id != 3) return '/signin';
// }

// async function isAdmin () {
//   isAuthorized();

//   const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find_by_token', {
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