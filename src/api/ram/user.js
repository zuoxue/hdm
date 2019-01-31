import request from "axios"

// 创建子账号
export async function createUserChild(query, callback) {
  var d = await request({
    url: '/ram/userRam/addUser',
    method: 'post',
    data: query
  });
  callback(d);
}

// 获取账号下所有子用户
export async function getAllUserChild(query, callback) {
  var d = await request({
    url: `/ram/userRam/searchByOwnerId/${query.ownerId}`,
    method: 'get',
    data: query
  });
  callback(d);
}

// 创建用户组
export async function createUsergroupChild(query, callback) {
  var d = await request({
    url: '/ram/group/saveGroup',
    method: 'post',
    data: query
  });
  callback(d);
}

// 获取账号下所有子用户组
export async function getAllUsergroupChild(query, callback) {
  var d = await request({
    url: `/ram/group/searchGroupByOwnerId/${query.ownerId}`,
    method: 'get',
    data: query
  });
  callback(d);
}

export async function submitMethod(data, query, callback) {
  var d = await request({
    url: data.url,
    method: data.method,
    data: query
  });
  callback(d);
}
