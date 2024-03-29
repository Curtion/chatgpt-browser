import axios from 'axios'
export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 600000,
})

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${userInfo.value.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      showToast('缓存已过期，请刷新页面!')
      userInfo.value.id = ''
      userInfo.value.token = ''
    }
    else {
      if (error.code === 'ERR_CANCELED')
        return
      showToast('请求失败，请稍后再试!')
    }
    return Promise.reject(error)
  },
)
