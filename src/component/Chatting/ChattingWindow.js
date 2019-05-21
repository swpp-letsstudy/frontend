import React from 'react'

const ChattingWindow = props => {
  const { messages } = props
  return (
      <div>
        {messages.map(({message, username}, index) =>
            <div key={index}>{username}: {message}</div>)}
      </div>
  )
}

export default ChattingWindow