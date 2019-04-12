import request from 'axios';

// export async function getResourceData(data, cb) {
//   try {
//     let d = await request({
//       url: '/ram/resourceCount/queryRamResourceCount',
//       method: 'get',
//       params: data,
//     });

//     cb(d);
//   } catch (err) {
//     throw new Error(err);
//   }
// }

export async function getResourceData(data, cb) {
  try {
    let d = await request({
      url: '/ram/resourceCount/querySumResourceCount',
      method: 'get',
      params: data,
    });

    cb(d);
  } catch (err) {
    throw new Error(err);
  }
}
