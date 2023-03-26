interface msg {
  send: string
  receive: string
  loading: boolean,
  controller?: AbortController
}
