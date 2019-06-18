import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'
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
    const { match } = this.props
    const { meetingId } = match.params
    apis.readMeeting({ meetingId }).then(value => this.setState({
      meeting: value.data,
    }))
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
    const { meeting } = this.state
    return (meeting &&
      <Wrapper>
        <Icon name='chevron left'>
        {meeting &&
          <Link to={routes.GROUP_DETAIL.replace(':groupId', meeting.group.id)}>
            MeetingList
          </Link>
        }
        </Icon>
        <div style={{textAlignLast:'right'}} >
        <Icon name='trash' onClick={this.deleteMeeting}/>
        </div>

        <Title style={{marginTop: '0rem'}}>{meeting.time.substring(0, 10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분</Title>

        <Link to={{
          pathname: routes.MEETING_NOTICE_LIST,
          state: { meetingId: meeting.id }
        }}>
          <Div>
          공지
          </Div>
        </Link>

        <br/>

        <Div>
          Attendances
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


        <br/>
        <Link to={{
          pathname: routes.MY_MEETING_FINE_LIST.replace(':meetingId', meeting.id),
          state: {
            meetingId: meeting.id,
            groupId: meeting.group.id,
          }
        }}>
          <Div>
          벌금
          </Div>
        </Link>
       
        

      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userReducer.user.id,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail)
