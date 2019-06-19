import React, { Component } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import routes from 'routes'
import apis from 'apis'


import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

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
    const { meetingId, backurl } = this.props
    const { notice } = this.state
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meetingId),
              state: { meetingId, backurl },
            }}>
              MeetingList
            </Link>
          </Icon>

          <Title>{notice.title}</Title>
          
          <Writer>
          Writer: {notice.writer && notice.writer.nickname}
          </Writer>

          <hr />
          <div
            style={{fontSize: "1.2rem"}}
          >{notice.contents}</div>
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
