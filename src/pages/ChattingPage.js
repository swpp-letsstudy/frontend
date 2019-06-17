import React from 'react'

import Chatting from 'component/Chatting'

const ChattingPage = props => {
  const { groupId } = props.match.params
  return <Chatting groupId={groupId} />
}

export default ChattingPage
