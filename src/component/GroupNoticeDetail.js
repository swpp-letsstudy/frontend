import React, { Component } from 'react'

import apis from 'apis'

class GroupNoticeDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
        notice: {},
    }
  }

  componentDidMount() {
    const { noticeId, groupId } = this.props
    apis.readGroupNotice({ noticeId, groupId })
    .then(response => {
        console.log(response)
        this.setState({
            notice: response.data,
        })
    })
  }

  render() {
    const { notice } = this.state
    return (
      <>
        <h1>Title</h1>
        <p>{notice.title}</p>
        <h1>Contents</h1>
        <p>{notice.contents}</p>
      </>
    )
  }
}


export default GroupNoticeDetail
