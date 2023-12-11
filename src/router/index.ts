import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { NO_RESET_WHITE_LIST } from '@/constants'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.analysis'),
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/achievements',
    component: Layout,
    redirect: '/achievements/workCategoryManagement',
    name: 'Achievements',
    meta: {
      title: t('router.achievements'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'workCategoryManagement',
        name: 'workCategoryManagement',
        component: () => import('@/views/Achievements/workCategoryManagement/ExamplePage.vue'),
        // redirect: '//menu1',
        meta: {
          title: t('router.workCategoryManagement')
        }
      },
      {
        path: 'workCategoryManagement-add',
        component: () => import('@/views/Achievements/workCategoryManagement/ExampleAdd.vue'),
        name: 'workCategoryManagementAdd',
        meta: {
          title: t('router.exampleAdd'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true
          // activeMenu: '/workCategoryManagementAdd'
        }
      },
      {
        path: 'workCategoryManagement-edit',
        component: () => import('@/views/Achievements/workCategoryManagement/ExampleEdit.vue'),
        name: 'workCategoryManagementEdit',
        meta: {
          title: t('router.exampleEdit'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/workCategoryManagement'
        }
      },
      {
        path: 'workCategoryManagement-detail',
        component: () => import('@/views/Achievements/workCategoryManagement/ExampleDetail.vue'),
        name: 'workCategoryManagementDetail',
        meta: {
          title: t('router.exampleDetail'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/workCategoryManagement'
        }
      },
      {
        path: 'workManagement',
        name: 'workManagement',
        component: () => import('@/views/Achievements/workManagement/ExamplePage.vue'),
        meta: {
          title: t('router.workManagement')
        }
      },
      {
        path: 'workManagement-add',
        component: () => import('@/views/Achievements/workManagement/ExampleAdd.vue'),
        name: 'WorkManagementAdd',
        meta: {
          title: '新增作品',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: 'workManagement'
        }
      },
      {
        path: 'workManagement-edit',
        component: () => import('@/views/Achievements/workManagement/ExampleEdit.vue'),
        name: 'WorkManagementEdit',
        meta: {
          title: '作品编辑',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/workManagement'
        }
      },
      {
        path: 'workManagement-detail',
        component: () => import('@/views/Achievements/workManagement/ExampleDetail.vue'),
        name: 'WorkManagementDetail',
        meta: {
          title: '作品详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/workManagement'
        }
      }
    ]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/studentManagement',
    name: 'UserManagement',
    meta: {
      title: t('router.userManagement'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'studentManagement',
        name: 'studentManagement',
        component: () => import('@/views/UserManagement/studentManagement/ExamplePage.vue'),
        meta: {
          title: t('router.studentManagement')
        }
      },
      {
        path: 'studentManagement-add',
        name: 'studentManagementAdd',
        component: () => import('@/views/UserManagement/studentManagement/ExampleAdd.vue'),
        meta: {
          title: '新增学生',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/studentManagement'
        }
      },
      {
        path: 'studentManagement-detail',
        name: 'studentManagementDetail',
        component: () => import('@/views/UserManagement/studentManagement/ExampleDetail.vue'),
        meta: {
          title: '学生详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/studentManagement'
        }
      },
      {
        path: 'studentManagement-edit',
        name: 'studentManagementEdit',
        component: () => import('@/views/UserManagement/studentManagement/ExampleEdit.vue'),
        meta: {
          title: '编辑学生信息',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/studentManagement'
        }
      },
      {
        path: 'teacherManagement',
        name: 'teacherManagement',
        component: () => import('@/views/UserManagement/teacherManagement/ExamplePage.vue'),
        meta: {
          title: t('router.teacherManagement')
        }
      },
      {
        path: 'teacherManagement-add',
        name: 'teacherManagementAdd',
        component: () => import('@/views/UserManagement/teacherManagement/ExampleAdd.vue'),
        meta: {
          title: '新增教师',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/teacherManagement'
        }
      },
      {
        path: 'teacherManagement-edit',
        name: 'teacherManagementEdit',
        component: () => import('@/views/UserManagement/teacherManagement/ExampleEdit.vue'),
        meta: {
          title: '编辑教师信息',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/teacherManagement'
        }
      },
      {
        path: 'teacherManagement-detail',
        name: 'teacherManagementDetail',
        component: () => import('@/views/UserManagement/teacherManagement/ExampleDetail.vue'),
        meta: {
          title: '教师信息详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/teacherManagement'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
