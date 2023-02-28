export const msgList = ref([
  {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }],
)
export const sendMsg = (msg: string) => {
  msgList.value.push({
    send: msg,
    receive: `${msg}World`,
  })
}
