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
    .then(loadMeetings({ groupId: meeting.group.id }))
    history.push(routes.GROUP_DETAIL.replace(':groupId', meeting.group.id))
  }

  render() {
    const { meeting } = this.state
    return (meeting &&
      <Wrapper>
        <Icon name='chevron left'>
        {meeting &&
          <Link to={routes.GROUP_DETAIL.replace(':groupId', meeting.group.id)}>
            MeetingList
          </Link>
        }
        </Icon>
        <Title>{meeting.time}</Title>
        <Div>
          Attendances
        </Div>
          {meeting.group.members.map((user, index) =>
            <div style={{ fontSize: "1.2rem" , textAlign: "left"}} key={user.id}>
              {user.nickname}
              {this.isAttendance(user) ?
                <Icon onClick={() => this.toggleUserAttendanceHandler(user)} name='check circle outline' />
                :
                <Icon onClick={() => this.toggleUserAttendanceHandler(user)} name='times circle outline' />
              }
            <br/>
            </div>
          )}
        <Link to={{
          pathname: routes.MEETING_NOTICE_LIST,
          state: { meetingId: meeting.id }
        }}>
          공지
        </Link>
        <Link to={{
          pathname: routes.MY_MEETING_FINE_LIST.replace(':meetingId', meeting.id),
          state: {
            meetingId: meeting.id,
            groupId: meeting.group.id,
          }
        }}>
          벌금
        </Link>
        <Button onClick={this.deleteMeeting}>
          삭제
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
