import React, { Component } from 'react'
import queryString from 'query-string/index'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
      meetings: [],
    }
  }

  componentDidMount() {
    const { match } = this.props
    const groupId = match.params.id
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    apis.loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
  }

  render() {
    const { group, meetings } = this.state
    return group &&
        <>
          <div>{group.name}</div>
          {meetings.map((meeting, index) =>
              <Link key={index} to={`${routes.MEETING_DETAIL.replace(':id', meeting.id)}`}>
                meeting time: {meeting.time}<br/>
              </Link>
          )}
          <Link to={`${routes.MEETING_FORM}?${queryString.stringify({groupId: group.id})}`}>
            미팅 만들기
          </Link>
        </>
  }
}

export default GroupDetail
