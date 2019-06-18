import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actionCreators from 'store/actions'
import routes from 'routes'
import apis from 'apis'

import { Button } from 'semantic-ui-react'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

class MeetingNoticeDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notice: {},
    }
  }

  componentDidMount() {
    const { meetingNoticeId, meetingId } = this.props
    console.log(meetingNoticeId)
    apis.readMeetingNotice({ meetingNoticeId, meetingId })
      .then(response => {
        this.setState({
          notice: response.data,
        })
      })
  }

  deleteMeetingNotice = () => {
    const { meetingId, meetingNoticeId, loadMeetingNotices, history } = this.props
    apis.deleteMeetingNotice({meetingNoticeId, meetingId})
    .then(loadMeetingNotices({ meetingId }))
    .then(history.push({
      pathname: routes.MEETING_DETAIL,
      state: { meetingId },
    }))
  }

  render() {
    const { meetingId } = this.props
    const { notice } = this.state
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meetingId),
              state: { meetingId },
            }}>
              MeetingList
            </Link>
          </Icon>

          <div>
          Writer: {notice.writer && notice.writer.nickname}
          </div>
          <Title>Title</Title>
          <div>{notice.title}</div>
          <Title>Contents</Title>
          <div>{notice.contents}</div>
          <Button onClick={this.deleteMeetingNotice}>
            삭제
          </Button>
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadMeetingNotices: payload => dispatch(actionCreators.loadMeetingNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingNoticeDetail)
