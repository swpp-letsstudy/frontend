import React from 'react'
import styled from 'styled-components'

const Message = props => {
  const { nickname, message } = props
  return <MessageStyled>{nickname}: {message}</MessageStyled>
}

const MessageStyled = styled.div`
height: 30pt;
`

export default Message