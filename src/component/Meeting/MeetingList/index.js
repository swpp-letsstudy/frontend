import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actionCreators from 'store/actions'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'

class MeetingList extends Component {
  componentDidMount() {
    const { loadMeetings, groupId } = this.props
    loadMeetings({ groupId })
  }

  render() {
    const { meetings, groupId } = this.props
    console.log(meetings)
    return (
      <Wrapper>
        {meetings.map((meeting, index) =>
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meeting.id),
              state: {
                groupId,
                backurl: routes.MEETING_LIST,
              },
            }}>
              {meeting.time.substring(0,10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분
            </Link>
          </div>
        )}
        <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
          GroupDetail
        </Link>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList)
