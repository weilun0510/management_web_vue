import Vue from 'vue';
import Router from 'vue-router';
import router from '../router';
// import store from '../store';
// import { routerMode } from '../config/env'
import menu_icon_index from '@/assets/images/menu_icon_index.png';
import menu_icon_platform from '@/assets/images/menu_icon_platform.png';
import menu_icon_app from '@/assets/images/menu_icon_app.png';
import menu_icon_user from '@/assets/images/menu_icon_user.png';
import menu_icon_permission from '@/assets/images/menu_icon_permission.png';

Vue.use(Router);
// 带id表示是侧边栏菜单数据
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '测试'
      },
      component: resolve => require(['@/views/agreement3.vue'], resolve)
      
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/views/login/index.vue'], resolve)
      
    },
    {
      path: '/',
      name: 'Layout',
      meta: {
        title: '首页'
      },
      component: resovle => {
        require(['../components/layout/index.vue'], resovle);
      },
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            title: '首页'
          },
          id: 1,
          pid: 0,
          icon: menu_icon_index,
          component: resolve => require(['@/views/index.vue'], resolve)
        },
        {
          path: '/platform',
          name: 'platform',
          meta: {
            title: '平台管理'
          },
          id: 2,
          pid: 0,
          icon: menu_icon_platform,
          component: resolve => require(['@/views/platform'], resolve)
        },
        {
          path: '/platform/detail',
          name: 'detail',
          meta: {
            title: '企业详情'
          },
          component: resolve => require(['@/views/platform/detail'], resolve)
        },
        {
          path: '/application',
          name: 'application',
          meta: {
            title: '应用管理'
          },
          id: 3,
          pid: 0,
          icon: menu_icon_app,
          component: resolve => require(['@/views/application'], resolve)
        },
        {
          path: '/application/wisdomCard',
          name: 'wisdomCard',
          meta: {
            title: '智慧名片',
            keepAlive: true
          },
          id: 4,
          pid: 3,
          component: resolve => require(['@/views/application/wisdomCard'], resolve)
        },
        {
          path: '/application/wisdomCard/radarMgmt/visitorListMore',
          name: 'visitorListMore',
          meta: {
            title: '智慧名片'
          },
          component: resolve => require(['@/views/application/wisdomCard/radarMgmt/visitorListMore'], resolve)
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '用户管理',
            keepAlive: true
          },
          id: 5,
          pid: 0,
          icon: menu_icon_user,
          component: resolve => require(['@/views/user'], resolve)
        },
        {
          path: '/permission',
          name: 'permission',
          meta: {
            title: '权限组',
            keepAlive: true // 需要被缓存
          },
          id: 6,
          pid: 0,
          icon: menu_icon_permission,
          component: resolve => require(['@/views/permission'], resolve)
        },
        {
          path: '/applicationList',
          name: 'applicationList',
          meta: {
            title: '申请列表'
          },
          id: 7,
          pid: 0,
          icon: menu_icon_permission,
          component: resolve => require(['@/views/applicationList'], resolve)
        },
        {
          path: '/permission/customer/add',
          name: 'permissionCustomerAdd',
          meta: {
            title: '添加客户组'
          },
          component: resolve => require(['@/views/permission/customer/add'], resolve)
        },
        {
          path: '/permission/customer/modify',
          name: 'permissionCustomerModify',
          meta: {
            title: '编辑客户组'
          },
          component: resolve => require(['@/views/permission/customer/modify'], resolve)
        },
        {
          path: '/permission/subAdmin/add',
          name: 'permissionSubAdminAdd',
          meta: {
            title: '添加权限组'
          },
          component: resolve => require(['@/views/permission/subAdmin/add'], resolve)
        },
        {
          path: '/permission/subAdmin/modify',
          name: 'permissionSubAdminModify',
          meta: {
            title: '编辑权限组'
          },
          component: resolve => require(['@/views/permission/subAdmin/modify'], resolve)
        },
        // {
        //   path: '/',
        //   name: 'Layout',
        //   meta: {
        //     title: '权限组'
        //   },
        //   component: resovle => {
        //     require(['../components/layout/index.vue'], resovle);
        //   },
        //   redirect: '/index',
        //   children: [{
        //     path: 'menu1',
        //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
        //     name: 'Menu1',
        //     meta: { title: 'Menu1' },
        //   }]
        // },
        {
          path: '/user/customer/add',
          name: 'userCustomerAdd',
          component: resolve => require(['@/views/user/customer/add'], resolve),
          meta: { title: '添加客户' }
        },
        {
          path: '/user/customer/modify',
          name: 'userCustomerModify',
          component: resolve => require(['@/views/user/customer/modify'], resolve),
          meta: { title: '编辑客户详情' }
        },
        {
          path: '/user/subAdmin/modify',
          name: 'userSubAdminModify',
          component: resolve => require(['@/views/user/subAdmin/modify'], resolve),
          meta: { title: '编辑管理员人详情' }
        },
        {
          path: '/user/subAdmin/add',
          name: 'userAdminAdd',
          component: resolve => require(['@/views/user/subAdmin/add'], resolve),
          meta: { title: '添加子管理员' }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
  console.log(to)
  next();
});
