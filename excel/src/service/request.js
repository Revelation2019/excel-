import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:3001', // api的base_url
  timeout: 4500000 // 请求超时时间
  // withCredentials: true
})

export const post = (url, params) => {
  return service({
    url,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const get = (url, params) => {
  return service({
    url,
    method: 'get',
    params: params
  })
}

// 导出excel
export const exportRequest = (url, body, params) => {
  return service({
    url,
    method: 'post',
    data: JSON.stringify(body),
    params: params,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 4500000,
    responseType: 'blob'
  })
}

export default service
