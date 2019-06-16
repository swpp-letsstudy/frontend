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
    const { noticeId, meetingId } = this.props
    apis.readMeetingNotice({ noticeId, meetingId })
      .then(response => {
        this.setState({
          notice: response.data,
        })
      })
  }

  deleteMeetingNotice = () => {
    const { meetingId, noticeId, loadMeetingNotices, history } = this.props
    apis.deleteMeetingNotice({noticeId, meetingId})
    .then(loadMeetingNotices({ meetingId }))
    .then(history.push({
      pathname: routes.MEETING_NOTICE_LIST,
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
              pathname: routes.MEETING_NOTICE_LIST,
              state: { meetingId },
            }}>MeetingNoticeList
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
