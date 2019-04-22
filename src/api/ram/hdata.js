import request from 'axios';

// hive查询
export async function queryHive(query, cb) {
  let d = await request({
    url: `/hi/hive/${query.database}/query`,
    method: 'post',
    params: query,
  });
  cb(d);
}

// hive语句解析
export async function explainHiveFunc(query, cb) {
  let d = await request({
    url: `/hi/hive/${query.database}/explain`,
    method: 'post',
    params: query,
  });
  cb(d);
}

//hive 语句格式化
export async function formatHiveFunc(query, cb) {
  let d = await request({
    url: '/hi/hive/format',
    method: 'post',
    params: query,
  });
  cb(d);
}

// impala查询
export async function queryImpala(query, cb) {
  let d = await request({
    url: `/hi/impala/${query.database}/query`,
    method: 'post',
    params: query,
  });
  cb(d);
}

// impala语句解析
export async function explainImpalaFunc(query, cb) {
  let d = await request({
    url: `/hi/impala/${query.database}/explain`,
    method: 'post',
    params: query,
  });
  cb(d);
}

//impala 语句格式化
export async function formatImpalaFunc(query, cb) {
  let d = await request({
    url: '/hi/impala/format',
    method: 'post',
    params: query,
  });
  cb(d);
}

// 列出hive数据库
export async function listHiveDatabase(query, cb) {
  let d = await request({
    url: '/hi/hive/databases',
    method: 'get',
    params: query,
  });
  cb(d);
}

// 列出hive数据库的表
export async function showHiveTable(query, cb) {
  let d = await request({
    url: `/hi/hive/databases/${query.table}`,
    method: 'get',
    params: {},
  });
  cb(d);
}

// 列出hive数据表数据
export async function showHiveTableData(query, cb) {
  let d = await request({
    url: `/hi/hive/${query.database}/${query.table}/queryTen`,
    method: 'post',
    data: {},
  });
  cb(d);
}

// 列出hive数据表属性
export async function showHiveTableProperty(query, cb) {
  let d = await request({
    url: `/hi/hive/table/schema/${query.database}/${query.table}`,
    method: 'get',
    data: {},
  });
  cb(d);
}

// 列出hive数据表属性
export async function generatorTable(query, cb) {
  let d = await request({
    url: '/hi/hive/createView',
    method: 'post',
    params: query,
  });
  cb(d);
}
// 列出impala数据库
export async function listImpalaDatabase(query, cb) {
  let d = await request({
    url: '/hi/impala/databases',
    method: 'get',
    params: query,
  });
  cb(d);
}
