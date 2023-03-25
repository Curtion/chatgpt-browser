export function send(msg: string) {
  return request({
    url: '/send',
    method: 'post',
    data: {
      msg,
    },
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
