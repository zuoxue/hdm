import request from 'axios'

// 获取一级目录
export function getHdfsAllFirst(query) {
  return request({
    url: '/urm/hdfs/getHdfsAllFirst',
    method: 'post',
    data: query
  })
}

// 获取下拉目录
export function remote(query) {
  return request({
    url: '/urm/hdfs/getHdfsAllByName',
    method: 'post',
    data: query
  })
}

// 创建目录/文件
export function createDir(query) {
  return request({
    url: "/urm/hdfs/createDir",
    method: 'post',
    data: query
  })
}

// 删除文件
export function deleteHdfs(query) {
  return request({
    url: "/urm/hdfs/deleteHdfs",
    method: 'delete',
    data: query
  })
}


//批量删除
export function deleteHdfsAll(query) {
  return request({
    url: "/urm/hdfs/deleteHdfsAll",
    method: 'delete',
    data: query
  })
}

//重命名
export function renameHdfs(query) {
  return request({
    url: '/urm/hdfs/renameHdfs',
    method: 'post',
    data: query
  })
}
