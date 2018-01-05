import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router);
// 懒加载组件
const home = () => import('Pages/home/home.vue');
const user = () => import('Pages/userManage/index.vue');
const addUser = () => import('Pages/userManage/add/index.vue');
const editUser = () => import('Pages/userManage/edit/index.vue');
const menu = () => import('Pages/menuManage/index.vue');

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [
      {
        path: '/home',
        component: home,
        meta: {
          requiresAuth: true
        }
      },
      // 用户管理
      {
        path: '/user',
        component: user,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/user/add',
        name: 'addUser',
        component: addUser,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/user/edit',
        name: 'editUser',
        component: editUser,
        meta: {
          requiresAuth: true
        }
      },
      // 菜单管理
      {
        path: '/menu',
        name: 'menu',
        component: menu,
        meta: {
          requiresAuth: true
        }
      },

    ]
  }
];

export default new Router({
  routes: routes
})
