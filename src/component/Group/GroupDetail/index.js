import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from './MeetingCreateButton'
import Link from './GroupLink'
import Div from './GroupDivDetail'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'
import { HOST } from 'config'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: null,
    }
  }

  componentDidMount() {
    const { loadMeetings, groupId } = this.props
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
  }

  deleteGroup = () => {
    const { loadGroups } = this.props
    apis.deleteGroup({ groupId: this.state.group.id })
      .then(loadGroups)
      .then(() => {
        this.props.history.push(routes.GROUP_LIST)
      })
  }

  openCloseGroup = () => {
    const groupId = this.state.group.id
    apis.openCloseGroup({ groupId })
      .then(value => apis.readGroup({ groupId }))
      .then(value => this.setState({
        group: value.data
      }))
  }

  render() {
    const { group } = this.state
    const { meetings, nickname } = this.props
    return group &&
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.GROUP_LIST}>
              GroupList
            </Link>
          </Icon>
          {group.owner === nickname ?
            <Button onClick={this.openCloseGroup}>
              {group.is_open ? '끄기' : '켜기'}
            </Button> : <></>}
          <Title>{group.name}</Title>

          <Div>미팅목록</Div>

          {meetings.map((meeting, index) =>
            <div style={{textAlign:"left",marginTop:"1rem",fontSize:"1.2rem"}}>
              <Link to={`${routes.MEETING_DETAIL.replace(':meetingId', meeting.id)}`}>
                {meeting.time}
              </Link>
            </div>
          )}

          <div style={{textAlign:"left",marginTop:"1rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_FORM,
              state: { groupId: group.id },
            }}>
              미팅만들기
            </Link>
          </div>

          
          <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId: group.id },
            }}>
            <Div>
              공지
            </Div>
          </Link>
          

          <Div>
            Invitation Code
          </Div>
          <div style={{ fontSize: "1.2rem" , textAlign: "left"}}>{`${HOST}join_group/?token=${group.id}`}</div>
          
          <br />
          <Button>
            <Link to={routes.CHATTING.replace(':groupId', group.id)} style={{ color: "white" }}>
              채팅하기
            </Link>
          </Button>
          <Button>
            <Link to={{
              pathname: routes.MEETING_FORM,
              state: { groupId: group.id },
            }}
              style={{ color: "white" }}>
              미팅생성
            </Link>
          </Button>
          <Button onClick={this.deleteGroup}>탈퇴</Button>
          <Button>
            <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId: group.id },
            }}
              style={{ color: "white" }}>그룹 공지
            </Link>
          </Button>
          <div>
          <Link to={routes.CLOUD_STORAGE.replace(':groupId', group.id)}>파일</Link>
          </div>
        </Wrapper>
      </>
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.user.nickname,
  meetings: state.groupReducer.meetings,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
