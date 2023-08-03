import index from '@/view/index'
const routes = [
  {
    path: '/index',
    component: index,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/goods/Goods',
        name: '商品管理',
        component: () => import('@/view/goods/Goods'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/machine/Machine',
        name: '机器信息管理',
        component: () => import('@/view/machine/Machine'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/machine/MachineAisle',
        name: '货道信息管理',
        component: () => import('@/view/machine/MachineAisle'),
        meta: {
          requireAuth: true
        }
      },
      /**
       * 订单管理
       */
      {
        path: '/pay/Order',
        name: '交易订单',
        component: () => import('@/view/pay/Order'),
        meta: {
          requireAuth: true
        }
      },
      /**
       * 系统管理
       */
      {
        path: '/system/user',
        name: '用户管理',
        component: () => import('@/view/system/user'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/Module',
        name: '菜单管理',
        component: () => import('@/view/system/Module'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/Role',
        name: '角色管理',
        component: () => import('@/view/system/Role'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/Dept',
        name: '公司管理',
        component: () => import('@/view/system/Dept'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/Variable',
        name: '系统环境变量',
        component: () => import('@/view/system/Variable'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/Permission',
        name: '权限管理',
        component: () => import('@/view/system/Permission'),
        meta: {
          requireAuth: true
        }
      },
      /**
       * 支付管理
       */
      {
        path: '/machine/MachineConfig',
        name: '支付配置信息',
        component: () => import('@/view/machine/MachineConfig'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/pay/Config',
        name: '支付配置',
        component: () => import('@/view/pay/Config'),
        meta: {
          requireAuth: true
        }
      },
      /**
       * 数据监控
       */
      {
        path: '/druid/login',
        name: '监控查询',
        component: () => import('@/view/druid/login'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/charts/statistics',
        name: '数据可视化',
        component: () => import('@/view/charts/statistics'),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/',
    name: '',
    component: () => import('@/view/login'),
    hidden: true,
    meta: {
      requireAuth: false
    }
  }, {
    path: '/login',
    name: '登录',
    component: () => import('@/view/login'),
    hidden: true,
    meta: {
      requireAuth: false
    }
  }
]

export default routes
