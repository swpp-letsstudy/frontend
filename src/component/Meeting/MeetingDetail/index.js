import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'
import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Div from './MeetingDivDetail'
import Link from './MeetingDetailLink'

import actionCreators from 'store/actions'
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
    const { meetingId } = match.params
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

  deleteMeeting = () => {
    const { meeting } = this.state
    const { loadMeetings, history } = this.props
    apis.deleteMeeting({ meetingId: meeting.id })
    .then(loadMeetings({ groupId: meeting.group }))
    history.push(routes.GROUP_DETAIL.replace(':groupId', meeting.group))
  }

  joinExitMeeting = () => {
    const meetingId = this.state.meeting.id
    apis.joinExitMeeting({ meetingId })
    .then(() => apis.readMeeting({ meetingId }))
    .then(value => this.setState({
      meeting: value.data,
    }))
  }

  render() {
    const { meeting } = this.state
    const { userId } = this.props
    let isInMeeting = false
    if (meeting) {
      meeting.members.forEach((item, index, array) => {
        if (item.id === userId) {
          isInMeeting = true
        }
      })
    }
    return (meeting &&
      <Wrapper>
        <Icon name='chevron left'>
        {meeting &&
          <Link to={routes.GROUP_DETAIL.replace(':groupId', meeting.group)}>
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
        <Button onClick={this.deleteMeeting}>
          삭제
        </Button>
        <Button onClick={this.joinExitMeeting}>
          {isInMeeting ? '불참' : '참가'}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userReducer.user.id,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail)
