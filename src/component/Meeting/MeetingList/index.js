import React, { Component } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Link from './MeetingLink'
class MeetingList extends Component {
  componentDidMount() {
    const { loadMeetings, groupId, setInfo } = this.props
    setInfo({
      groupId,
      backurl: routes.MEETING_LIST,
    })
    loadMeetings({ groupId })
  }

  render() {
    const { meetings, groupId } = this.props
    return (
      <Wrapper>
        <Icon name='chevron left'>
          <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
            GroupDetail
          </Link>
        </Icon>
        <Title>
          미팅 목록
        </Title>
        <hr/>
        {meetings.map((meeting, index) =>
          <div key={meeting.id} style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meeting.id),
              state: { groupId },
            }}>
              {meeting.time.substring(0,10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분
            </Link>
          </div>
        )}
        
        <br />
        <Link to={{
          pathname: routes.MEETING_FORM,
          state: { groupId },
        }}>
          미팅 만들기
        </Link>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  meetings: state.groupReducer.meetings,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
  setInfo: payload => dispatch(actionCreators.setInfo(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList)
