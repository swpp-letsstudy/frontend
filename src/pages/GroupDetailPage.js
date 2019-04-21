import React, { Component } from 'react'
import queryString from 'query-string/index'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'

class GroupDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
      meetings: [],
    }
  }

  componentDidMount() {
    const { location } = this.props
    const groupId = queryString.parse(location.search).id
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
              <Link key={index} to={routes.MEETING_DETAIL}>
                meeting time: {meeting.time}<br/>
              </Link>)}
          {group &&
          <Link to={`${routes.MEETING_FORM}?${queryString.stringify({id: group.id})}`}>
            미팅 만들기
          </Link>}
        </>
  }
}

export default GroupDetailPage
