import React, { Component } from 'react'

import Chatting from 'component/Chatting'

class ChattingPage extends Component {

  render() {
    const { match } = this.props
    const groupId = match.params.groupId
    return <Chatting groupId={groupId} />
  }
}

export default ChattingPage
