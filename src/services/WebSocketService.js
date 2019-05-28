import {WEB_SOCKET_HOST} from 'config'

class WebSocketService {
  static instance = null

  static getInstance(userToken) {
    if (!WebSocketService.instance)
      WebSocketService.instance = new WebSocketService(userToken)
    return WebSocketService.instance
  }

  constructor(userToken) {
    this.groupIds = []
    this.callback = null
    this.token = userToken
    this.webSocket = new WebSocket(WEB_SOCKET_HOST)
    this.webSocket.onclose = () => {
      this.webSocket = new WebSocket(WEB_SOCKET_HOST)
      for (let groupId in this.groupIds)
        this.setGroup(groupId, this.callback)
    }
    this.webSocket.onmessage = event => {
      const data = JSON.parse(event.data)
      this.callback(data)
    }
  }

  setGroup(groupId, callback) {
    this.callback = callback
    const intv = setInterval(() => {
      // Send join command when the socket is opened
      if (this.webSocket.readyState === 1) {
        this.webSocket.send(JSON.stringify({
          token: this.token,
          command: 'join',
          groupId,
        }))
        clearInterval(intv)
      }
    },100)
  }

  sendMessage(groupId, nickname, message) {
    this.webSocket.send(JSON.stringify({
      token: this.token,
      command: 'message',
      nickname,
      groupId,
      message,
    }))
  }
}

export default WebSocketService
