import React, { Component } from 'react'
import { connect } from 'react-redux'

import WebSocketService from 'services/WebSocketService'
import ChattingWindow from './ChattingWindow'

import Wrapper from 'component/Styles/Wrapper'

import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

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
    this.webSocketService.sendMessage(groupId, user.nickname, message)
  }

  render() {
    const { groupId } = this.props
    const { messagesByGroups } = this.state
    console.log(messagesByGroups)
    const messages = messagesByGroups[groupId] || []
    return (
      <Wrapper>
        <Icon name='chevron left'>
        <Link to={`/groups/${groupId}`}>
            MeetingList
        </Link>
        <br/>
        <br/>
      </Icon>
        <ChattingWindow messages={messages} onSendMessage={this.onSendMessage}/>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Chatting)