import request from 'axios';
import { stringify } from 'qs';
// 创建子账号
export async function createUserChild(query, callback) {
  var d = await request({
    url: '/ram/userRam/addUser',
    method: 'post',
    data: query,
  });
  callback(d);
}

// 获取账号下所有子用户
export async function getAllUserChild(query, callback) {
  var d = await request({
    url: `/ram/userRam/searchByOwnerId/${query.ownerId}`,
    method: 'get',
    data: query,
  });
  callback(d);
}

//删除用户
export async function deleteUserChild(data, query, callback) {
  var d = await request({
    url: `/ram/userRam/deleteUser/${data.userId}`,
    method: 'delete',
    data: query,
  });
  callback(d);
}

// 获取账号下用户组的子用户
export async function getAllUserChildone(query, callback) {
  var d = await request({
    url: `/ram/userRam/searchByGroupId/${query.groupId}`,
    method: 'get',
    data: query,
  });
  callback(d);
}

// 创建用户组
export async function createUsergroupChild(query, callback) {
  var d = await request({
    url: '/ram/group/saveGroup',
    method: 'post',
    data: query,
  });
  callback(d);
}

//删除用户组
export async function deleteUsergroupChild(data, query, callback) {
  var d = await request({
    url: `/ram/group/${data.groupId}`,
    method: 'delete',
    data: query,
  });
  callback(d);
}
// 获取账号下所有子用户组
export async function getAllUsergroupChild(query, callback) {
  var d = await request({
    url: `/ram/group/searchGroupByOwnerId/${query.ownerId}`,
    method: 'get',
    data: query,
  });
  callback(d);
}

// 获取用户所在的用户组
export async function getUsergroupByUser(query, callback) {
  var d = await request({
    url: `/ram/group/searchByUserId/${query.ownerId}`,
    method: 'get',
    data: query,
  });
  callback(d);
}

export async function submitMethod(data, query, callback) {
  var d = await request({
    url: data.url,
    method: data.method,
    data: query,
  });
  callback(d);
}

// 对子账户的密码修改
export async function modifyPass(data, callback) {
  var d = await request({
    url: `/ram/userRam/updatePassword/${data.userId}/${data.password}`,
    method: 'POST',
    data: {},
  });
  callback(d);
}

// 创建accesskey
export async function createAccesskeyHandler(data, callback) {
  // let param = stringify(data);
  var d = await request({
    url: `/ram/ak/createRamKey`,
    method: 'POST',
    data: data,
    transformRequest: [
      function(data) {
        let res = '';
        for (var i in data) {
          res += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
        }
        return res;
      },
    ],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  callback(d);
}

// 获取所有accesskey
export async function getAllAccesskey(data, callback) {
  var d = await request({
    url: `/ram/ak/queryRamByUserId`,
    method: 'GET',
    params: data,
  });
  callback(d);
}

// 修改accesskey状态
export async function updateAccesskey(data, callback) {
  var d = await request({
    url: `/ram/ak/updateById`,
    method: 'POST',
    data: data,
  });
  callback(d);
}

// 获取分布accesskey
export async function getAllDistrictAccesskey(data, callback) {
  var d = await request({
    url: `/ram/ak/queryRamKeyDistribution`,
    method: 'GET',
    params: data,
  });
  callback(d);
}
