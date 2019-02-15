import request from "axios"

// 获取策略所有版本
export async function getVersion(data, callback) {
  const d = await request({
    url: "/ram/policy/statement/getVersion",
    method: 'get',
    data: data
  });
  console.log(d)
  try {
    callback(d);
  } catch (e) {
    console.log(e);
  }
}

// 增加策略版本语句
export async function addAuthParam(data, callback) {
  const d = await request({
    url: "/ram/policy/statement/insertRamPolicyStatement",
    method: 'post',
    data: data
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}

// 获取策略版本所有的语句
export async function getAllAuth(data, callback) {
  const d = await request({
    url: "/ram/policy/statement/getAllStatement",
    method: 'get',
    data: data
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}

// 更新策略版本语句
export async function updateAuthParam(data, callback) {
  const d = await request({
    url: "/ram/policy/statement/updateStatement",
    method: 'put',
    data: data
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}


// 新建自定义策略
export async function createRamPolicy(data, callback) {
  const d = await request({
    url: "/ram/policy/insertRamPolicy",
    method: 'post',
    data: data
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}

// 查询所有策略
export async function getALlPolicys(data, query, callback) {
  const d = await request({
    url: `/ram/policy/getByOwnerId/${query.owner_id}`,
    method: 'get',
    data: data
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}

export async function modifyPolicyStatus(data, callback) {
  const d = await request({
    url: `/ram/policy/updateStatus?id=${data.id}&status=${data.status}`,
    method: 'put',
    data: {}
  });
  try {
    callback(d)
  } catch (e) {
    console.log(e);
  }
}
