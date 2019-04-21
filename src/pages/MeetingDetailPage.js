import React, { Component } from 'react'
import queryString from 'query-string'

import apis from 'apis'

class MeetingDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meeting: null,
    }
  }

  componentDidMount() {
    const { location } = this.props
    const meetingId = queryString.parse(location.search).id
    apis.readMeeting({meetingId}).then(value => this.setState({
      meeting: value.data,
    }))
  }

  render() {
    const { meeting } = this.state
    return (meeting &&
        <div>
          Meeting Time: {meeting.time}<br/>
          Attendance
          {meeting.group.users.map((user, index) =>
              <div key={index}>
                {user.username}: {user.id in meeting.attendances ? 'O' : 'X'}
              </div>
          )}
        </div>
    )
  }
}

export default MeetingDetailPage
