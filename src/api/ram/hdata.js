import request from "axios"

export async function queryHive(query, cb) {
  let d = await request({
    url: '/api/urs/hive/query',
    method: 'post',
    params: query
  });
  cb(d)
}
