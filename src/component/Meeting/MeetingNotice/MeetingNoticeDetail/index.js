import React, { Component } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import routes from 'routes'
import apis from 'apis'


import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Link from './MeetingLink'
import Div from './MeetingNoticeDiv'
import Writer from './MeetingNoticeWriter'

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
      pathname: routes.MEETING_DETAIL.replace(':meetingId', meetingId),
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

          <Title>{notice.title}</Title>
          
          <Writer>
          Writer: {notice.writer && notice.writer.nickname}
          </Writer>

          <hr />
          <Div>{notice.contents}</Div>
          <div style={{textAlign: 'right'}}>
          <Icon name='trash alternate outline' onClick={this.deleteMeetingNotice} style={{fontSize: '1.5rem'}}/>
          </div>
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
