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

//删除用户
export async function deleteUserChild(data, query, callback) {
  var d = await request({
    url: `/ram/userRam/deleteUser/${data.userId}`,
    method: 'delete',
    data: query
  });
  callback(d);
}

// 获取账号下用户组的子用户
export async function getAllUserChildone(query, callback) {
  var d = await request({
    url: `/ram/userRam/searchByGroupId/${query.groupId}`,
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

//删除用户组
export async function deleteUsergroupChild(data, query, callback) {
  var d = await request({
    url: `/ram/group/${data.groupId}`,
    method: 'delete',
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

// 获取用户所在的用户组
export async function getUsergroupByUser(query, callback) {
  var d = await request({
    url: `/ram/group/searchByUserId/${query.ownerId}`,
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
