import { send } from '~/api'
interface msg {
  send: string
  receive: string
}

export const msgList = useStorage('msgList', [] as msg[])

export const sendMsg = async (msg: string) => {
  const res = await send(msg)
  // TODO 需要支持加载动画和打字机效果
  msgList.value.push({
    send: msg,
    receive: res.data.message,
  })
}
