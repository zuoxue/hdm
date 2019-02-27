import request from "axios"

// hive查询
export async function queryHive(query, cb) {
  let d = await request({
    url: '/api/urs/hive/query',
    method: 'post',
    params: query
  });
  cb(d)
}

// hive语句解析
export async function explainHiveFunc(query, cb) {
  let d = await request({
    url: '/api/urs/hive/explain',
    method: 'post',
    params: query
  });
  cb(d)
}

//hive 语句格式化
export async function formatHiveFunc(query, cb) {
  let d = await request({
    url: '/api/urs/hive/format',
    method: 'post',
    params: query
  });
  cb(d)
}



// impala查询
export async function queryImpala(query, cb) {
  let d = await request({
    url: '/api/urs/impala/query',
    method: 'post',
    params: query
  });
  cb(d)
}

// impala语句解析
export async function explainImpalaFunc(query, cb) {
  let d = await request({
    url: '/api/urs/impala/explain',
    method: 'post',
    params: query
  });
  cb(d)
}

//impala 语句格式化
export async function formatImpalaFunc(query, cb) {
  let d = await request({
    url: '/api/urs/impala/format',
    method: 'post',
    params: query
  });
  cb(d)
}
