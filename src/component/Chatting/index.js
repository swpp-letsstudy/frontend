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
  }

  componentDidMount() {
    const { user, groupId } = this.props
    const webSocketService = WebSocketService.getInstance(user.token)
    webSocketService.setGroup(groupId, this.onMessageHandler)
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

  render() {
    const { groupId } = this.props
    const { messagesByGroups } = this.state
    console.log(messagesByGroups)
    const messages = messagesByGroups[groupId] || []
    return <ChattingWindow messages={messages}/>
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Chatting)