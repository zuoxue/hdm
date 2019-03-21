/*
  表单权限管理接口
*/
import request from "axios"

// 获取所有菜单权限
export async function getAllMenuManager(data, cb) {
  let d = await request({
    url: '/admin/user/getAllManager',
    method: 'get',
    params: data
  });

  cb(d)
}

// 新增菜单权限
export async function addMenuManager(data, cb) {
  let d = await request({
    url: '/admin/user/sysMenuManager/add',
    method: 'post',
    data: data
  });

  cb(d)
}

// 编辑菜单权限
export async function editMenuManager(data, cb) {
  let d = await request({
    url: '/admin/user/sysMenuManager/update',
    method: 'put',
    data: data
  });

  cb(d)
}


// 删除菜单权限
export async function deleteMenuManager(data, cb) {
  let d = await request({
    url: `/admin/user/sysMenuManager/delete/${data.id}`,
    method: 'delete',
    data: {}
  });

  cb(d)
}


// 获取所有资源权限
export async function getAllResourceManager(data, cb) {
  let d = await request({
    url: '/ram/manager/getAllManager',
    method: 'get',
    params: data
  });

  cb(d)
}


// 新增资源权限
export async function addResourceManager(data, cb) {
  let d = await request({
    url: '/ram/manager/addManager',
    method: 'post',
    data: data
  });

  cb(d)
}

// 编辑资源权限
export async function editResourceManager(data, cb) {
  let d = await request({
    url: '/ram/manager/updateManager',
    method: 'put',
    data: data
  });

  cb(d)
}


// 删除资源权限
export async function deleteResourceManager(data, cb) {
  let d = await request({
    url: `/ram/manager/deleteManager/${data.id}`,
    method: 'delete',
    data: {}
  });

  cb(d)
}
