import { send } from '~/api'

export const msgList = useStorage('msgList', [] as msg[])

export const sendMsg = async (msg: string) => {
  msgList.value.push({
    send: msg,
    receive: '',
    loading: true,
  })
  try {
    const res = await send(msg)
    for (let i = 0; i < res.data.message.length; i++) {
      // 打字机效果
      await new Promise((resolve) => {
        setTimeout(() => {
          msgList.value[msgList.value.length - 1].receive += res.data.message[i]
          resolve('')
        }, 50)
      },
      )
    }
  }
  catch (error: any) {
    msgList.value[msgList.value.length - 1].receive = `error: ${error?.toString()}`
  }
  finally {
    msgList.value[msgList.value.length - 1].loading = false
  }
}
