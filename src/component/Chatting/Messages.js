import React, { Component } from 'react'
import Message from './Message'
import styled from 'styled-components'


class Messages extends Component {
  constructor(props) {
    super(props)
    this.bottomDivRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Auto-scroll-down when new message comes
    this.bottomDivRef.current.scrollIntoView()
  }

  render() {
    const {messages} = this.props
    return (
        <MessagesStyled>
          {messages.map(({message, username}, index) =>
              <Message key={index} username={username} message={message}/>)}
          <div ref={this.bottomDivRef}></div>
        </MessagesStyled>
    )
  }
}

const MessagesStyled = styled.div`
overflow-y: scroll;
`

export default Messages
