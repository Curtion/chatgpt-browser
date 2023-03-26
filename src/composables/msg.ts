import type { AxiosProgressEvent } from 'axios'
import { send } from '~/api'

export const isTypeWriter = useStorage('isTypeWriter', true)

export const msgList = useStorage('msgList', [] as msg[])

export const toggleTypeWriter = useToggle(isTypeWriter)

export const sendMsg = async (msg: string) => {
  msgList.value.push({
    send: msg,
    receive: '',
    loading: true,
  })
  try {
    setController(new AbortController())
    const res = await send(msg, (progressEvent: AxiosProgressEvent) => {
      const data = progressEvent.event.target.response
      if (isTypeWriter.value)
        msgList.value[msgList.value.length - 1].receive = data
    }, getController())
    if (!isTypeWriter.value)
      msgList.value[msgList.value.length - 1].receive = res.data
  }
  catch (error: any) {
    msgList.value[msgList.value.length - 1].receive = `error: ${error?.toString()}`
  }
  finally {
    msgList.value[msgList.value.length - 1].loading = false
  }
}
