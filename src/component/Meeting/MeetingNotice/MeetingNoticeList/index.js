import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'

import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

class MeetingNoticeList extends Component {
  componentDidMount() {
    const { meetingId, loadMeetingNotices } = this.props
    loadMeetingNotices({ meetingId })
  }

  render() {
    const { meetingNotices, meetingId } = this.props
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.MEETING_DETAIL.replace(':id', meetingId)}>MeetingList</Link>
          </Icon>

          <Title>
            Meeting Notice List
          </Title>
          {meetingNotices.map((notice, index) => (
            <Fragment key={notice.id}>
              <Link to={{
                pathname: routes.MEETING_NOTICE_DETAIL.replace(':id', notice.id),
                state: { meetingId },
              }}>
                {notice.title}
              </Link>
              <br />
            </Fragment>
          ))}

          <Link to={{
            pathname: routes.MEETING_NOTICE_FORM,
            state: { meetingId }
          }}>새로만들기</Link>
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  meetingNotices: state.groupReducer.meetingNotices,
})

const mapDispatchToProps = dispatch => ({
  loadMeetingNotices: payload => dispatch(actionCreators.loadMeetingNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingNoticeList)
