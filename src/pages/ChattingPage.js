import React, { Component } from 'react'


class ChattingPage extends Component {

  componentDidMount() {
    const { match } = this.props
    const groupId = match.params.groupId
    // TODO: load chatting messages with groupId
  }

  render() {
    return <div>Chatting Page</div>
  }
}

export default ChattingPage
