import React from 'react'
import styled from 'styled-components'

const Message = props => {
  const { username, message } = props
  return <MessageStyled>{username}: {message}</MessageStyled>
}

const MessageStyled = styled.div`
height: 30pt;
`

export default Message