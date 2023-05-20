import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/first-hop',
    children: [{
      path: 'first-hop',
      name: 'FirstHop',
      component: () => import('@/views/first-hop/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/work-performance',
    component: Layout,
    redirect: '/work-performance/monopoly-line',
    meta: { title: '工作业绩', icon: 'chart' },
    children: [
      {
      path: 'monopoly-line',
      name: 'MonopolyLine',
      component: () => import('@/views/work-performance/monopoly-line'),
      meta: { title: '专卖线', icon: 'el-icon-wallet' },
      },
      {
        path: 'business-line',
        name: 'BussinessLine',
        component: () => import('@/views/work-performance/business-line'),
        meta: { title: '业务线', icon: 'el-icon-suitcase' },
      },
    ]
  },
  {
    path: '/performance-assess',
    component: Layout,
    redirect: '/performance-assess/job-assess',
    meta: { title: '绩效考核', icon: 'clipboard' },
    children: [
      {
      path: 'job-assess',
      name: 'JobAssess',
      component: () => import('@/views/performance-assess/job-assess'),
      meta: { title: '岗位考核', icon: 'el-icon-document' }
    },
    {
      path: 'department-assess',
      name: 'DepartmentAssess',
      component: () => import('@/views/performance-assess/department-assess'),
      meta: { title: '部门考核', icon: 'el-icon-tickets' }
    }
  ]
  },
  {
    path: '/performance-show',
    component: () => import('@/views/performance-show/index'),
    meta: { title: '绩效展示', icon: 'peoples' }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
