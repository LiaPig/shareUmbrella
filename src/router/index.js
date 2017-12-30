import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router);
// 懒加载组件
const home = () => import('Pages/home/home.vue');
const user = () => import('Pages/userManage/index.vue');
const addUser = () => import('Pages/userManage/add/index.vue');


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
      {
        path: '/user',
        component: user,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/user/add',
        component: addUser,
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
