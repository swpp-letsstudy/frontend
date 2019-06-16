import React from 'react'

import Chatting from 'component/Chatting'

const ChattingPage = props => {
  const groupId = this.props.match.params.groupId
  return <Chatting groupId={groupId} />
}

export default ChattingPage
