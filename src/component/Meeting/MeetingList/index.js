import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import apis from 'apis'
import actionCreators from 'store/actions'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

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
            <Link to={`${routes.MEETING_DETAIL.replace(':meetingId', meeting.id)}`}>
              {meeting.time.substring(0,10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분
            </Link>
          </div>
        )}
        <Icon name='chevron left'>
          <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
            GroupDetail
          </Link>
        </Icon>
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
