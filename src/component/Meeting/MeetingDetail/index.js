import React, { Component } from 'react'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Div from './MeetingDivDetail'
import Link from './MeetingDetailLink'

import apis from 'apis'
import routes from 'routes'

class MeetingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meeting: null,
    }
  }

  componentDidMount() {
    const { match } = this.props
    const meetingId = match.params.id
    apis.readMeeting({ meetingId }).then(value => this.setState({
      meeting: value.data,
    }))
  }

  toggleUserAttendanceHandler = user => {
    const { meeting } = this.state
    const meetingId = meeting.id
    apis.toggleAttendance({ userId: user.id, meetingId })
      .then(() => apis.readMeeting({ meetingId }))
      .then(value => this.setState({ meeting: value.data }))
  }

  isAttendance = user => {
    const { meeting } = this.state
    return meeting && meeting.attendances.includes(user.id)
  }

  render() {
    const { meeting } = this.state
    return (meeting &&
      <Wrapper>
        <Icon name='chevron left'>
        {meeting &&
          <Link to={routes.GROUP_DETAIL.replace(':id', meeting.group)}>
            MeetingList
          </Link>
        }
          
        </Icon>
        <Title>Attendance</Title>
        <Div>
          Meeting Time: {meeting.time}
        </Div>
          {meeting.members.map((user, index) =>
            <Div key={user.id}>
              {user.nickname}
              {this.isAttendance(user) ?
                <Icon onClick={() => this.toggleUserAttendanceHandler(user)} name='check circle outline' />
                :
                <Icon onClick={() => this.toggleUserAttendanceHandler(user)} name='times circle outline' />
              }

            </Div>
          )}
        <Link to={{
          pathname: routes.MEETING_NOTICE_LIST,
          state: { meetingId: meeting.id }
        }}>
          공지
        </Link>
      </Wrapper>
    )
  }
}

export default MeetingDetail
