import request from "axios"

export async function callApi(url, method, data, cb) {
  let d = null;
  if (method == "POST") {
    d = await request({
      url: url,
      method: method,
      data: data
    });
  } else {
    d = await request({
      url: url,
      method: method,
      params: data
    });
  }
  cb(d)
}
