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
      sum: 0,
      myFines: [],
    }
  }

  componentDidMount() {
    const { loadMeetings, groupId, loadGroupNotices } = this.props
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    apis.readMyFines({ groupId })
    .then(value => this.setState({
      myFines: value.data,
    }))
    apis.getFineSum({ groupId })
    .then(value => this.setState({
      sum: value.data,
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
    const { group, sum  } = this.state
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
                    
                    <Link to={
                      {
                        pathname: routes.GROUP_SETTING,
                        state: { groupId },
                      }}
                    >
                      <Icon name='setting'/>
                    </Link>
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


          <hr/>
          <div style={{textAlignLast:'center'}}>
          <Button basic color='black' compact>
            <Link to={routes.CHATTING.replace(':groupId', group.id)}>
              채팅
            </Link>
          </Button>
          
          <Button basic color='black' compact>
            <Link to={routes.CLOUD_STORAGE.replace(':groupId', group.id)}>
              파일
            </Link>
          </Button>
          </div>

          <div>{group.attendance_amount}</div>
          <Div>
            미팅목록
          </Div>
          {meetings.map((meeting, index) =>
            <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
              <Link to={`${routes.MEETING_DETAIL.replace(':meetingId', meeting.id)}`}>
                {meeting.time.substring(0,10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분
              </Link>
            </div>
          )}
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_FORM,
              state: { groupId: group.id },
            }}>
              미팅만들기
            </Link>
          </div>

          <br />

          <Div>
            공지
          </Div>
          {groupNotices.map((groupNotice, index) => (
            <Fragment key={groupNotice.id}>
              <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
              <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':groupNoticeId', groupNotice.id),
                state: { groupId },
              }}>
                {groupNotice.title}
              </Link>
              </div>    
            </Fragment>
          ))}
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
          <Link to={{
            pathname: routes.GROUP_NOTICE_FORM,
            state: { groupId }
          }}>
            새로만들기
            </Link>
          </div>

          <br />

          

          <Link to={{
            pathname: routes.POLICY_LIST,
            state: { groupId },
          }}>
            <Div>
              벌금
            </Div>
          </Link>
  
          <Link to={{
            pathname: routes.MY_POLICY_LIST,
            state: { groupId },
          }}>
            <div style={{ fontSize: "1.2rem" , textAlign: "left"}}>
              {sum}원
            </div>
          </Link>


          <br />

          <Div>
            Invitation Code
          </Div>
          <div style={{ fontSize: "1.2rem" , textAlign: "left"}}>{`${HOST}join_group/?token=${group.id}`}</div>
          
          <br/>

          <div style={{textAlign: 'center'}} onClick={this.deleteGroup}>
          <Icon name='sign out'/>
          그룹 탈퇴
          </div>
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
