import request from "axios"

// 获取当前用户所有资源
export async function getResourceByOwnerId(query, data, cb) {
  let d = await request({
    url: `/ram/resource/getResourceByOwnerId/${query.ownerId}`,
    method: "get",
    data: data
  });
  cb(d);
}

// 单个资源下的所有用户
export async function getUserByResource(query, data, cb) {
  let d = await request({
    url: `/ram/userRam/getUserByResource/${query.id}`,
    method: "get",
    data: data
  });
  cb(d);
}

// 单个资源下的未授权人员
export async function getUserByNotResource(query, data, cb) {
  let d = await request({
    url: `/ram/userRam/getUserByNotResource/${query.id}/${query.userId}`,
    method: "get",
    data: data
  });
  cb(d);
}

//资源上架，下架
export async function updateResource(data, cb) {
  let d = await request({
    url: `/ram/resource/updateResource?status=${data.status}&id=${data.id}&parentId=${data.parentId}`,
    method: "put",
    data: {}
  });
  try {
    cb(d);
  } catch (e) {
    console.log(e)
  }

}

// 新增资源
export async function insertResource(data, cb) {
  let d = await request({
    url: "/ram/resource/insertResource",
    method: "put",
    data: data
  });
  cb(d);
}

// 资源是否启用/禁用
export async function setResourceStatus(data, cb) {
  let d = await request({
    url: "/ram/resource/updateSysResource",
    method: "put",
    data: data,
    transformRequest: [
      function (data) {
        let res = '';
        for (var i in data) {
          res += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
        }
        return res;
      }
    ],
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  cb(d);
}


// 创建资源
export async function addResource(data, cb) {
  let d = await request({
    url: "/ram/resource/addResource",
    method: "post",
    data: data
  });
  cb(d);
}

// 删除资源
export async function deleteResource(data, cb) {
  let d = await request({
    url: `/ram/resource/${data.id}`,
    method: "delete",
    data: {}
  });
  cb(d);
}


// 详情
export async function showResourceDetail(data, cb) {
  let d = await request({
    url: `/ram/resource/getResourceByParentId/${data.id}`,
    method: "get",
    params: {}
  });
  cb(d);
}