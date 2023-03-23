export const msgList = ref([
  {
    send: '没有找到Design Resolution',
    receive: `在较新版本的Cocos Creator中，Design Resolution被重命名为Design Resolution Size。要在新版本中设置横屏模式，请按照以下步骤操作：

    打开Cocos Creator编辑器，并打开您的项目。

    在场景编辑器中，选择您的Canvas节点。

    在属性检查器中，展开Canvas组件，并找到Design Resolution Size属性。

    将该属性的Fit选项都取消选中，并将Width和Height的值互换。例如，如果您的游戏分辨率为720x1280，您需要将它们交换为1280x720。

    点击保存并运行您的游戏。现在，您的游戏应该是横屏模式了。

    如果您的游戏需要支持多种屏幕分辨率，可以使用适配模式和屏幕适配器来自动缩放游戏内容。在新版本的Cocos Creator中，适配模式位于Canvas组件的属性检查器中，而屏幕适配器可以通过使用cc.view.setDesignResolutionSize()和cc.view.setFrameSize()等API进行手动调整。

    请注意，如果您的游戏使用了某些插件或引用了其他资源，您可能需要手动调整这些插件或资源的大小和位置，以适应横屏模式。`,
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  }, {
    send: 'Hello',
    receive: 'World',
  },
  {
    send: 'Hello',
    receive: 'World',
  },
],
)
export const sendMsg = (msg: string) => {
  msgList.value.push({
    send: msg,
    receive: `${msg}World`,
  })
}
