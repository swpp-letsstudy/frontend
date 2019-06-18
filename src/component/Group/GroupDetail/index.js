import React, { Component, Fragment } from 'react'
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
    const { loadMeetings, groupId, loadGroupNotices } = this.props
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    loadMeetings({ groupId }).then(value => this.setState({
      meetings: value.data,
    }))
    loadGroupNotices({ groupId })
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
    const { meetings, nickname, groupNotices, groupId } = this.props
    return group &&
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.GROUP_LIST}>
              GroupList
            </Link>
          </Icon>
          {group.owner === nickname 
            ?
              group.is_open 
              ?
                <div>
                  <div style={{textAlign:"right",size:"1.2rem"}} >
                    가입허용: <Icon style={{textAlign:"right"}} onClick={this.openCloseGroup} name='check circle outline'/>
                  </div>
                  <Title style={{marginTop: "0rem"}}>
                    {group.name}
                  </Title>
                </div>
              :
                <div>
                  <div style={{textAlign:"right",size:"1.2rem"}} >
                    가입허용: <Icon style={{textAlign:"right"}} onClick={this.openCloseGroup} name='circle outline'/>
                  </div>
                  <Title style={{marginTop: "0rem"}}>
                    {group.name}
                  </Title>
                </div>
            :
              <Title>
                {group.name}
              </Title>
          }
          
          <div>{group.attendance_amount}</div>
          <Div>미팅목록</Div>

          {meetings.map((meeting, index) =>
            <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
              <Link to={`${routes.MEETING_DETAIL.replace(':meetingId', meeting.id)}`}>
                {meeting.time}
              </Link>
            </div>
          )}

          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
            <Link to={{
              pathname: routes.MEETING_FORM,
              state: { groupId: group.id },
            }}>
              미팅만들기
            </Link>
          </div>

          <br />

          <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId: group.id },
            }}>
            <Div>
              공지
            </Div>
          </Link>
          {groupNotices.map((groupNotice, index) => (
            <Fragment key={groupNotice.id}>
              <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
              <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':groupNoticeId', groupNotice.id),
                state: { groupId },
              }}>
                {groupNotice.title}
              </Link>
              </div>    
            </Fragment>
          ))}
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
          <Link to={{
            pathname: routes.GROUP_NOTICE_FORM,
            state: { groupId }
          }}>
            새로만들기
            </Link>
          </div>

          <br />
          <Div>
            Invitation Code
          </Div>
          <div style={{ fontSize: "1.2rem" , textAlign: "left"}}>{`${HOST}join_group/?token=${group.id}`}</div>
          

          <br />
          <br />
          <Button>
            <Link to={routes.CHATTING.replace(':groupId', group.id)} style={{ color: "white" }}>
              채팅
            </Link>
          </Button>
          
          
          <Button>
            <Link to={{
              pathname: routes.MY_POLICY_LIST,
              state: { groupId: group.id },
            }} style={{ color: "white" }}>
              벌금
            </Link>
          </Button>
          
          <Button>
            <Link to={routes.CLOUD_STORAGE.replace(':groupId', group.id)} style={{ color: "white" }}>
              파일
            </Link>
          </Button>

          <Button onClick={this.deleteGroup}>
            탈퇴
          </Button>
        </Wrapper>
        
      </>
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.user.nickname,
  meetings: state.groupReducer.meetings,
  groupNotices: state.groupReducer.groupNotices,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
