// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '公会管理' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '公会概况', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          // {
          //   path: 'analysis/:pageNo([1-9]\\d*)?',
          //   name: 'Analysis',
          //   component: () => import('@/views/dashboard/Analysis'),
          //   meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          // },
          // // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { title: '监控页（外部）', target: '_blank' }
          // },
          {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '公会概况', keepAlive: true, permission: [ 'dashboard' ] }
          }
          // {
          //   path: 'test-work',
          //   name: 'TestWork',
          //   component: () => import('@/views/dashboard/TestWork'),
          //   meta: { title: '测试功能', keepAlive: true, permission: [ 'dashboard' ] }
          // }
        ]
      },
      // members
      {
        path: '/members',
        redirect: '/members/Members',
        component: PageView,
        meta: { title: '成员管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/members',
            name: 'Members',
            component: () => import('@/views/members/Members'),
            meta: { title: '成员列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/members/lookMembers',
            name: 'lookMembers',
            hidden: true,
            component: () => import('@/views/members/lookMembers/lookMembers'),
            meta: { title: '成员详情', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // task
      {
        path: '/task',
        redirect: '/task/task',
        component: PageView,
        meta: { title: '任务管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/task',
            name: 'task',
            component: () => import('@/views/task/task'),
            meta: { title: '任务列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/taskRecord',
            name: 'taskRecord',
            component: () => import('@/views/task/taskRecord'),
            meta: { title: '任务记录表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/task/lookTask',
            name: 'lookTask',
			hidden: true,
            component: () => import('@/views/task/lookTask/lookTask'),
            meta: { title: '任务详情', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // store
      {
        path: '/store',
        redirect: '/store/store',
        component: PageView,
        meta: { title: '商品管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/store',
            name: 'store',
            component: () => import('@/views/store/store'),
            meta: { title: '商品列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/store/lookStore',
            name: 'lookStore',
			hidden: true,
            component: () => import('@/views/store/lookStore/lookStore'),
            meta: { title: '商品详情', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // reward
      {
        path: '/reward',
        redirect: '/reward/reward',
        component: PageView,
        meta: { title: '公会奖励管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/reward',
            name: 'reward',
            component: () => import('@/views/reward/reward'),
            meta: { title: '奖励列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/rewardCode',
            name: 'rewardCode',
            component: () => import('@/views/reward/rewardCode'),
            meta: { title: '兑换码列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/rewardUseCode',
            name: 'rewardUseCode',
            component: () => import('@/views/reward/rewardUseCode'),
            meta: { title: '兑换码使用记录', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/reward/lookReward',
            name: 'lookReward',
			hidden: true,
            component: () => import('@/views/reward/lookReward/lookReward'),
            meta: { title: '奖励详情', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // Images
      {
        path: '/Images',
        redirect: '/images/Images',
        component: PageView,
        meta: { title: '图片库', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/Images',
            name: 'Images',
            component: () => import('@/views/images/images'),
            meta: { title: '图片库', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
