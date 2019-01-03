export default {
  title: '环亚HDM平台 - Health Data Manager',
  logo: 'HDM',
  indexTitle: '环亚HDM平台 - Health Data Manager',
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock' ], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  lockPage: '/lock',
  tokenTime: 6000,
  info: {
    title: '环亚 HDM 平台 - Health Data Manager',
    list: [
      '支持关系型数据厍(Oracle、MySQL等)',
      '支持大数据平台(HDFS、HBase、Hive、Kudu、Impala、Solr等)',
      '支持格式化文件(XML、JSON、CSV、TXT、Excel等)',
      '资源交换、资源共享',
      '分类导航、资源搜索和定位',
      '大数据应用管理'
    ]
  },
  // http的status默认放行不才用统一处理的,
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: '首页',
    value: '/#/wel/index',
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}
