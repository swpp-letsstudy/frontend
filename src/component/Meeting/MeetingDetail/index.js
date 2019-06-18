import React, { Component } from 'react'
import { connect } from 'react-redux'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

class MeetingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meeting: null,
      fines: [],
    }
  }

  componentDidMount() {
    const { match, loadMeetingNotices } = this.props
    const { meetingId } = match.params
    apis.readMeeting({ meetingId })
      .then(value => this.setState({
        meeting: value.data,
      }))
    apis.readMyMeetingFines({ meetingId })
      .then(value => this.setState({
        fines: value.data,
      }))
    loadMeetingNotices({ meetingId })
  }

  deleteMeeting = () => {
    const { meeting } = this.state
    const { loadMeetings, history } = this.props
    apis.deleteMeeting({ meetingId: meeting.id })
    .then(loadMeetings({ groupId: meeting.group.id }))
    history.push(routes.GROUP_DETAIL.replace(':groupId', meeting.group.id))
  }

  render() {
    const { meetingNotices, meetingId, backurl, groupId, userId, nickname } = this.props
    const { meeting, fines } = this.state
    const isAttendance = meeting && meeting.attendances.includes(userId)
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
        
        <div>
          {isAttendance ? <></> : <div>Attendance</div>}
          {fines.map((fine, index) => (
            <div key={fine.id}>{fine.policy.name}</div>
          ))}
          <br />
          {meeting && (meeting.group.owner===nickname) ? <Link to={{
            pathname: routes.MEETING_POLICY_MANAGE,
            state: { meetingId, groupId },
          }}>벌금 관리</Link>: <></>}
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.user.nickname,
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
