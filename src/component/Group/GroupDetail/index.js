import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Progress } from 'semantic-ui-react'

import Button from './MeetingCreateButton'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'
import { HOST } from 'config'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupNoticeNum: 0,
      meetingNum: 0,
      group: null,
      sum: 0,
      myFines: [],
      successRate: 0,
    }
  }

  componentDidMount() {
    const { loadFewMeetings, groupId, loadFewGroupNotices, setInfo } = this.props
    setInfo({
      groupId,
      backurl: routes.GROUP_DETAIL.replace(':groupId', groupId),
    })
    apis.readGroup({ groupId }).then(value => this.setState({
      group: value.data
    }))
    apis.readMyGroupFines({ groupId })
    .then(value => this.setState({
      myFines: value.data,
    }))
    apis.getFineSum({ groupId })
    .then(value => this.setState({
      sum: value.data,
    }))
    loadFewMeetings({ groupId, num: this.state.meetingNum })
      .then(this.setState({ meetingNum: this.state.meetingNum + 1 }))
    loadFewGroupNotices({ groupId, num: this.state.groupNoticeNum })
      .then(this.setState({ groupNoticeNum: this.state.groupNoticeNum + 1 }))
    apis.getSuccessRate({ groupId })
      .then(value => this.setState({
        successRate: value.data,
      }))
  }

  appendMeeting = () => {
    const { groupId, loadFewMeetings } = this.props
    loadFewMeetings({ groupId, num: this.state.meetingNum })
    .then(this.setState({ meetingNum: this.state.meetingNum + 1 }))
  }

  appendGroupNotice = () => {
    const { groupId, loadFewGroupNotices } = this.props
    loadFewGroupNotices({ groupId, num: this.state.groupNoticeNum })
    .then(this.setState({ groupNoticeNum: this.state.groupNoticeNum + 1 }))
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
    const { group, sum, successRate } = this.state
    const { meetings, nickname, groupNotices, groupId } = this.props
    
    return group &&
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
                  <Link to={
                    {
                      pathname: routes.GROUP_SETTING,
                      state: {
                        groupId,
                        attendance_amount: group.attendance_amount,
                      },
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
            <Title>
              {group.name}
            </Title>
        }

        <hr/>

        <Progress percent={successRate} indicating label='성취도' progress/> 

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

        <hr/>
        


        <Link to={{
          pathname: routes.MEETING_LIST,
          state: { groupId },
        }}>
          <Div>
          미팅목록
          </Div>
        </Link>
        {meetings.map((meeting, index) =>
          <div key={meeting.id} style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meeting.id),
              state: { groupId },
            }}>
              {meeting.time.substring(0,10)} {meeting.time.substring(11,13)}시 {meeting.time.substring(14,16)}분
            </Link>
          </div>
        )}
        <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}} onClick={this.appendMeeting}>더보기</div>

        <br />

        <Link to={{
          pathname: routes.GROUP_NOTICE_LIST,
          state: { groupId },
        }}>
          <Div>
          공지
          </Div>
        </Link>
        {groupNotices.map((groupNotice, index) => (
          <Fragment key={groupNotice.id}>
            <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Link to={{
              pathname: routes.GROUP_NOTICE_DETAIL.replace(':groupNoticeId', groupNotice.id),
              state: { groupId },
            }} onClick={this.setBackUrl}>
              {groupNotice.title}
            </Link>
            </div>    
          </Fragment>
        ))}
        <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}} onClick={this.appendGroupNotice}>더보기</div>

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
          스터디 기간
        </Div>
        <div>
            {group.startday}~{group.endday}
        </div>
        <Div>
          스터디 요일
        </Div>
        <div>
            {days(group.monday,group.tuesday,group.wednesday,group.thursday,group.friday,group.saturday,group.sunday)}
        </div>
        <Div>
          스터디 시간
        </Div>
        <div>
            {group.time}
        </div>

        <Div>
          Invitation Code
        </Div>
        <div style={{ fontSize: "1.2rem" , textAlign: "left"}}>{`${HOST}join_group/?token=${group.id}`}</div>
        
        <br/>
        <Link to={{
          pathname: routes.GROUP_MEMBERS,
          state: {
            members: group.members,
            groupId,
          }
        }}>
          GroupMembers
        </Link>

        <hr/>
        <div style={{textAlign: 'center'}} onClick={this.deleteGroup}>
        <Icon name='sign out'/>
        그룹 탈퇴
        </div>
        <br/>
      </Wrapper>
  }
}

const days = (a,b,c,d,e,f,g) => {
  let str = ''
  if(a) str+='월'
  if(b) str+=', 화'
  if(c) str+=', 수'
  if(d) str+=', 목'
  if(e) str+=', 금'
  if(f) str+=', 토'
  if(g) str+=', 일'
  if(str.startsWith(',')) str = str.substring(2,str.length)
  return <div>{str}</div>
}

const mapStateToProps = state => ({
  nickname: state.userReducer.user.nickname,
  meetings: state.groupReducer.meetings,
  groupNotices: state.groupReducer.groupNotices,
})

const mapDispatchToProps = dispatch => ({
  loadFewMeetings: payload => dispatch(actionCreators.loadFewMeetings(payload)),
  loadFewGroupNotices: payload => dispatch(actionCreators.loadFewGroupNotices(payload)),
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
  setInfo: payload => dispatch(actionCreators.setInfo(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
