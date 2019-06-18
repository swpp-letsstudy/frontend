import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const { match, loadMeetingNotices } = this.props
    const { meetingId } = match.params
    apis.readMeeting({ meetingId }).then(value => this.setState({
      meeting: value.data,
    }))
    loadMeetingNotices({ meetingId })
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
    const { meetingNotices, meetingId, backurl, groupId } = this.props
    const { meeting } = this.state
    return (meeting &&
      <Wrapper>
        <Icon name='chevron left'>
        {meeting &&
          <Link to={{
            pathname: backurl,
            state: { groupId },
          }}>
            {backurl===routes.MEETING_LIST ?
            'MeetingList' :
            'GroupDetail'}
          </Link>
        }
        </Icon>
        <div style={{textAlignLast:'right'}} >
        <Icon name='trash' onClick={this.deleteMeeting}/>
        </div>

        <Title style={{marginTop: '0rem'}}>{meeting.time.substring(0, 10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분</Title>

        
        <Div>
          공지
        </Div>

        {meetingNotices.map((meetingNotice, index) => (
          <div key={meetingNotice.id} style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_NOTICE_DETAIL.replace(':meetingNoticeId', meetingNotice.id),
              state: {
                meetingId,
              },
            }}>
              {meetingNotice.title}
            </Link>
          </div>
        ))}

        <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
          <Link to={{
            pathname: routes.MEETING_NOTICE_FORM,
            state: { meetingId }
          }}>새로만들기</Link>
        </div>

        <br/>

        <Div>
          Fines
        </Div>

          {meeting.group.members.map((user, index) =>
            <div style={{textAlign:"left",fontSize:"1.2rem", marginTop:"0.8rem"}} key={user.id}>
              {this.isAttendance(user) ?
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(user)} name='check circle outline' />
                :
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(user)} name='times circle outline' />
              }
              {user.nickname}
            </div>
          )}

      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userReducer.user.id,
  meetingNotices: state.groupReducer.meetingNotices,
  backurl: state.groupReducer.backurl,
  groupId: state.groupReducer.groupId,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
  loadMeetingNotices: payload => dispatch(actionCreators.loadMeetingNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail)
