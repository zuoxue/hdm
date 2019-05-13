import request from 'axios';

// 获取用户的数据表分布
export async function getAllDatabase(data, cb) {
  let d = await request({
    url: `/ram/resource/tree?userId=${data.userId}`,
    method: 'get',
    params: {},
  });
  cb(d);
}

// 获取子用户的数据表
export async function getCheckedTree(data, cb) {
  let d = await request({
    url: `/ram/resource/checkedTree?userId=${data.userId}`,
    method: 'get',
    params: {},
  });
  cb(d);
}

// 提交增加删除表
export async function updateTable(data, cb) {
  let d = await request({
    url: `/ram/resource/updateTable`,
    method: 'put',
    params: data,
  });
  cb(d);
}

// 获取所有账户
export async function getdbAccount(data, cb) {
  let d = await request({
    url: `/ram/resource/getDataBaseLogin`,
    method: 'get',
    params: data,
  });
  cb(d);
}
