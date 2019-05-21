import React, { Component } from 'react'
import { connect } from 'react-redux'

import WebSocketService from 'services/WebSocketService'
import ChattingWindow from './ChattingWindow'


class Chatting extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messagesByGroups: {}, // key: groupId, value: an array of messages
    }
    this.webSocketService = null
  }

  componentDidMount() {
    const { user, groupId } = this.props
    this.webSocketService = WebSocketService.getInstance(user.token)
    this.webSocketService.setGroup(groupId, this.onMessageHandler)
  }

  onMessageHandler = message => {
    const groupId = message.groupId
    const { messagesByGroups } = this.state
    const messages = messagesByGroups[groupId] || []
    this.setState({
      messagesByGroups: {
        ...messagesByGroups,
        [groupId]: messages.concat(message),
      },
    })
  }

  onSendMessage = message => {
    const { groupId, user } = this.props
    this.webSocketService.sendMessage(groupId, user.username, message)
  }

  render() {
    const { groupId } = this.props
    const { messagesByGroups } = this.state
    console.log(messagesByGroups)
    const messages = messagesByGroups[groupId] || []
    return <ChattingWindow messages={messages} onSendMessage={this.onSendMessage}/>
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Chatting)