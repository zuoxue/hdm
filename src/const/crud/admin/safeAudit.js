export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  align: 'center',
  refreshBtn: true,
  showClomnuBtn: false,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: true,
  resetBtn: false,
  // dicUrl: '/admin/dict/type/log_type',
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '审计类型',
    prop: 'type'
  }, {
    label: '审计动作',
    prop: 'action'
  }, {
    label: '审计说明',
    prop: 'message'
  }, {
    label: '安全级别',
    prop: 'level'
  }, {
    label: 'IP地址',
    prop: 'remoteAddr'
  }, {
    label: '服务ID',
    prop: 'serviceId'
  }, {
    label: '请求URI',
    prop: 'requestUri'
  }, {
    label: '操作方式',
    prop: 'method'
  },
  ]
}
