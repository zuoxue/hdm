import Layout from '@/page/index/'
export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/page/wel')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/user/info'),
  },
  {
    path: 'overview',
    name: '访问控制',
    component: () => import('@/views/ram/control/overview'),
  }
  ]

}, {
  path: '/activti',
  component: Layout,
  redirect: '/activti/detail',
  children: [{
    path: 'detail/:id',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/activiti/detail')
  }]

}]
