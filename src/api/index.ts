import type { AxiosProgressEvent } from 'axios'

export function send(msg: string, onDownloadProgress: (progressEvent: AxiosProgressEvent) => void, controller: AbortController) {
  return request({
    url: '/send',
    method: 'post',
    data: {
      msg,
    },
    onDownloadProgress,
    signal: controller.signal,
  })
}

export function del() {
  return request({
    url: '/del',
    method: 'delete',
  })
}

export function login() {
  return request({
    url: '/login',
    method: 'post',
  })
}
