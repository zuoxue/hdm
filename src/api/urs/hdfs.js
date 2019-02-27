import request from 'axios'

// 获取一级目录
export function getHdfsAllFirst(url) {
  return request({
    url: url,
    method: 'get',
    data: {}
  })
}

// 获取下拉目录
export function remote(query) {
  return request({
    url: '/api/urs/hdfs/getHdfsAllByName',
    method: 'post',
    data: query
  })
}

// 创建目录/文件
export function createDir(query) {
  return request({
    url: '/api/urs/hdfs/filebrowser/mkdirs',
    method: 'put',
    data: query,
    transformRequest: [
      function (data) {
        let ret = '';
        for (var i in data) {
          ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
        }
        return ret;
      }
    ],
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

// 删除文件
export function deleteHdfs(query) {
  return request({
    url: "/api/urs/hdfs/filebrowser/delete",
    method: 'delete',
    params: query,

  })
}


//批量删除
export function deleteHdfsAll(query) {
  return request({
    url: '/api/urs/hdfs/filebrowser/batchdelete',
    method: 'delete',
    params: query
  })
}

//重命名
export function renameHdfs(query) {
  return request({
    url: '/api/urs/hdfs/filebrowser/rename',
    method: 'put',
    params: query
  })
}

// 下载
export function download(query) {
  return request({
    url: '/api/urs/hdfs/filebrowser/download',
    method: "get",
    params: query,
    responseType: "blob",
    headers: { 'filename': 'utf-8' },
  })
}

//路径概要
export async function pathSummary(query, cb) {
  let d = await request({
    url: '/api/urs/hdfs/filebrowser/contentsummary',
    method: 'get',
    params: query
  });

  cb(d);
}

// 预览
export function previewFile(query) {
  return request({
    url: "/api/urs/hdfs/filebrowser/preview",
    method: 'get',
    params: query,
    responseType: "stream",
    headers: { 'filename': 'utf-8' }
  })
}

// 设置权限
export function setPermission(query) {
  return request({
    url: "/api/urs/hdfs/filebrowser/setpermission",
    method: 'put',
    params: query,
  })
}

// 设置用户
export function setUsersRel(query) {
  return request({
    url: "/api/urs/hdfs/filebrowser/setowner",
    method: 'put',
    params: query,
  })
}
