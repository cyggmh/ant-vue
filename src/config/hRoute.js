import { RouteView, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
const ss = [

  // dashboard
  {
    path: '/demo/dashboard',
    name: 'dashboard',
    redirect: '/demo/dashboard/workplace',
    component: RouteView,
    meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
    children: [
      {
        path: '/demo/dashboard/analysis',
        name: 'Analysis',
        component: () => import('@/views/demo/dashboard/Analysis'),
        meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
      },
      // 外部链接
      {
        path: 'https://www.baidu.com/',
        name: 'Monitor',
        meta: { title: '监控页（外部）', target: '_blank' }
      },
      {
        path: '/demo/dashboard/workplace',
        name: 'Workplace',
        component: () => import('@/views/demo/dashboard/Workplace'),
        meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/demo/dashboard/test-work',
        name: 'TestWork',
        component: () => import('@/views/demo/dashboard/TestWork'),
        meta: { title: '测试功能', keepAlive: true, permission: [ 'dashboard' ] }
      }
    ]
  },

  // forms
  {
    path: '/demo/form',
    redirect: '/demo/form/base-form',
    component: PageView,
    meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
    children: [
      {
        path: '/demo/form/base-form',
        name: 'BaseForm',
        component: () => import('@/views/demo/form/BasicForm'),
        meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
      },
      {
        path: '/demo/form/step-form',
        name: 'StepForm',
        component: () => import('@/views/demo/form/stepForm/StepForm'),
        meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
      },
      {
        path: '/demo/form/advanced-form',
        name: 'AdvanceForm',
        component: () => import('@/views/demo/form/advancedForm/AdvancedForm'),
        meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
      }
    ]
  },

  // list
  {
    path: '/demo/list',
    name: 'list',
    component: PageView,
    redirect: '/demo/list/table-list',
    meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
    children: [
      {
        path: '/demo/list/table-list/:pageNo([1-9]\\d*)?',
        name: 'TableListWrapper',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/demo/list/TableList'),
        meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      },
      {
        path: '/demo/list/basic-list',
        name: 'BasicList',
        component: () => import('@/views/demo/list/StandardList'),
        meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      },
      {
        path: '/demo/list/card',
        name: 'CardList',
        component: () => import('@/views/demo/list/CardList'),
        meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      },
      {
        path: '/demo/list/search',
        name: 'SearchList',
        component: () => import('@/views/demo/list/search/SearchLayout'),
        redirect: '/demo/list/search/article',
        meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
        children: [
          {
            path: '/demo/list/search/article',
            name: 'SearchArticles',
            component: () => import('../views/demo/list/search/Article'),
            meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
          },
          {
            path: '/demo/list/search/project',
            name: 'SearchProjects',
            component: () => import('../views/demo/list/search/Projects'),
            meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
          },
          {
            path: '/demo/list/search/application',
            name: 'SearchApplications',
            component: () => import('../views/demo/list/search/Applications'),
            meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
          }
        ]
      }
    ]
  },

  // profile
  {
    path: '/demo/profile',
    name: 'profile',
    component: RouteView,
    redirect: '/demo/profile/basic',
    meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
    children: [
      {
        path: '/demo/profile/basic',
        name: 'ProfileBasic',
        component: () => import('@/views/demo/profile/basic/Index'),
        meta: { title: '基础详情页', permission: [ 'profile' ] }
      },
      {
        path: '/demo/profile/advanced',
        name: 'ProfileAdvanced',
        component: () => import('@/views/demo/profile/advanced/Advanced'),
        meta: { title: '高级详情页', permission: [ 'profile' ] }
      }
    ]
  },

  // result
  {
    path: '/demo/result',
    name: 'result',
    component: PageView,
    redirect: '/demo/result/success',
    meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
    children: [
      {
        path: '/demo/result/success',
        name: 'ResultSuccess',
        component: () => import(/* webpackChunkName: "result" */ '@/views/demo/result/Success'),
        meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      },
      {
        path: '/demo/result/fail',
        name: 'ResultFail',
        component: () => import(/* webpackChunkName: "result" */ '@/views/demo/result/Error'),
        meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      }
    ]
  },

  // Exception
  {
    path: '/demo/exception',
    name: 'exception',
    component: RouteView,
    redirect: '/demo/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
    children: [
      {
        path: '/demo/exception/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/demo/exception/403'),
        meta: { title: '403', permission: [ 'exception' ] }
      },
      {
        path: '/demo/exception/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/demo/exception/404'),
        meta: { title: '404', permission: [ 'exception' ] }
      },
      {
        path: '/demo/exception/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/demo/exception/500'),
        meta: { title: '500', permission: [ 'exception' ] }
      }
    ]
  },

  // account
  {
    path: '/demo/account',
    component: RouteView,
    redirect: '/demo/account/center',
    name: 'account',
    meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
    children: [
      {
        path: '/demo/account/center',
        name: 'center',
        component: () => import('@/views/demo/account/center/Index'),
        meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      },
      {
        path: '/demo/account/settings',
        name: 'settings',
        component: () => import('@/views/demo/account/settings/Index'),
        meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
        redirect: '/demo/account/settings/base',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/demo/account/settings/base',
            name: 'BaseSettings',
            component: () => import('@/views/demo/account/settings/BaseSetting'),
            meta: { title: '基本设置', permission: [ 'user' ] }
          },
          {
            path: '/demo/account/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/demo/account/settings/Security'),
            meta: { title: '安全设置', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/demo/account/settings/custom',
            name: 'CustomSettings',
            component: () => import('@/views/demo/account/settings/Custom'),
            meta: { title: '个性化设置', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/demo/account/settings/binding',
            name: 'BindingSettings',
            component: () => import('@/views/demo/account/settings/Binding'),
            meta: { title: '账户绑定', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/demo/account/settings/notification',
            name: 'NotificationSettings',
            component: () => import('@/views/demo/account/settings/Notification'),
            meta: { title: '新消息通知', keepAlive: true, permission: [ 'user' ] }
          }
        ]
      }
    ]
  },

  // other
  {
    path: '/demo/other',
    name: 'otherPage',
    component: PageView,
    meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
    redirect: '/demo/other/icon-selector',
    children: [
      {
        path: '/demo/other/icon-selector',
        name: 'TestIconSelect',
        component: () => import('@/views/demo/other/IconSelectorView'),
        meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/demo/other/list',
        component: RouteView,
        meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
        redirect: '/demo/other/list/tree-list',
        children: [
          {
            path: '/demo/other/list/tree-list',
            name: 'TreeList',
            component: () => import('@/views/demo/other/TreeList'),
            meta: { title: '树目录表格', keepAlive: true }
          },
          {
            path: '/demo/other/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/demo/other/TableInnerEditList'),
            meta: { title: '内联编辑表格', keepAlive: true }
          },
          {
            path: '/demo/other/list/user-list',
            name: 'UserList',
            component: () => import('@/views/demo/other/UserList'),
            meta: { title: '用户列表', keepAlive: true }
          },
          {
            path: '/demo/other/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/demo/other/RoleList'),
            meta: { title: '角色列表', keepAlive: true }
          },
          {
            path: '/demo/other/list/system-role',
            name: 'SystemRole',
            component: () => import('@/views/demo/role/RoleList'),
            meta: { title: '角色列表2', keepAlive: true }
          },
          {
            path: '/demo/other/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/demo/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      }
    ]
  }
]
console.log(ss)
