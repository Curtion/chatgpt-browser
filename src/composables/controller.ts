let controller = new AbortController()

export const setController = (newController: AbortController) => {
  controller = newController
}

export const getController = () => {
  return controller
}
