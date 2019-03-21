import request from '@/router/axios'

export function GetMenu() {
  return request({
    url: '/admin/menu',
    method: 'get'
  })
}

export function fetchMenuTree(query) {
  return request({
    url: '/admin/menu/tree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/menu',
    method: 'put',
    data: obj
  })
}

//获取选中的菜单权限
export function getMenuPermissions(obj) {
  return request({
    url: `/admin/user/getPermission/${obj.id}`,
    method: 'get',
    data: {}
  })
}

//获取所有的菜单类型
export function getMenuTypes(obj) {
  return request({
    url: '/admin/user/getTypeAndTypeName',
    method: 'get',
    data: obj
  })
}
