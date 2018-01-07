import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);
// 懒加载组件
const loading = () => import('Components/common/loading/index.vue');
const home = () => import('Pages/home/home.vue');
const user = () => import('Pages/userManage/index.vue');
const addUser = () => import('Pages/userManage/add/index.vue');
const editUser = () => import('Pages/userManage/edit/index.vue');
const menu = () => import('Pages/menuManage/index.vue');
const umbrella = () => import('Pages/umbrellaManage/index.vue')
const location = () => import('Pages/locationManage/index.vue');


const test = () => import('Pages/test.vue');


const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [
      // 测试页面
      {
        path: '/test',
        component: test,
        meta: {
          requiresAuth: true
        }
      },
      // loading页面
      {
        path: '/loading',
        name: "loading",
        component: loading,
        meta: {
          requiresAuth: true
        }
      },
      // 主页
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
      // 雨伞管理
      {
        path: '/umbrella',
        name: 'umbrella',
        component: umbrella,
        meta: {
          requiresAuth: true
        }
      },
      // 租借点管理
      {
        path: '/location',
        name: 'location',
        component: location,
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
