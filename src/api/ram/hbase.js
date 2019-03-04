import request from "axios"

// 列出集群
export async function tableClusterList(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/namespace/list",
    method: "get",
    params: data
  });
  cb(d);
}

// 删除表空间
export async function tableClusterDelete(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/namespace/delete",
    method: "delete",
    params: data
  });
  cb(d);
}

// 创建表空间
export async function tableClusterCreate(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/namespace/create",
    method: "post",
    params: data
  });
  cb(d);
}

// 列出表
export async function tableList(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/list",
    method: "get",
    params: data
  });
  cb(d);
}


// 创建表
export async function tableCreate(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/create",
    method: "post",
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  cb(d);
}

// 删除表
export async function tableDelete(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/delete",
    method: "delete",
    params: data
  });
  cb(d);
}

// 表启用
export async function tableuse(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/enable",
    method: "put",
    params: data
  });
  cb(d);
}

// 表禁用
export async function tabledisable(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/disable",
    method: "put",
    params: data
  });
  cb(d);
}

// 修改表
export async function tableModify(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/modify",
    method: "post",
    data: data
  });
  cb(d);
}


// 表描述
export async function tableInfos(data, cb) {
  let d = await request({
    url: "/urs/admin/hbase/table/descriptor",
    method: "get",
    params: data
  });
  cb(d);
}
