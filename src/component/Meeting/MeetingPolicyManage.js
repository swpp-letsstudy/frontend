import React, { Component } from 'react'
import { connect } from 'react-redux'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

class MeetingPolicyManage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting: null,
      fines: [],
    }
  }

  componentDidMount() {
    const { loadPolicies, groupId, meetingId } = this.props
    apis.readMeeting({ meetingId })
      .then(value => this.setState({
        meeting: value.data
      }))
    apis.readMeetingFines({ meetingId })
      .then(value => this.setState({
        fines: value.data,
      }))
    loadPolicies({ groupId })
  }

  manageFine = (policyId, userId) => {
    const { meetingId } = this.props
    apis.manageFine({ meetingId, policyId, userId })
      .then(value => {
        if (value.status === 200) {
          let preFines = this.state.fines
          if (preFines[policyId].includes(userId)) {
            let idx = preFines[policyId].indexOf(userId)
            preFines[policyId].splice(idx, 1)
          } else {
            preFines[policyId].push(userId)
          }
          this.setState({
            fines: preFines,
          })
        }
      })
  }
  
  toggleUserAttendanceHandler = userId => {
    const { meetingId } = this.props
    apis.toggleAttendance({ userId, meetingId })
      .then(() => apis.readMeeting({ meetingId }))
      .then(value => this.setState({
        meeting: value.data
      }))
  }

  isAttendance = user => {
    const { meeting } = this.state
    return meeting && meeting.attendances.includes(user.id)
  }

  render() {
    const { meetingId, policies } = this.props
    const { meeting, fines } = this.state
    const members = meeting ? meeting.group.members : null
    return (
      <Wrapper>
        <Icon name='chevron left'>
          <Link to={routes.MEETING_DETAIL.replace(':meetingId', meetingId)}>
            MeetingDetail
          </Link>
        </Icon>
        <Title>Fine Check</Title>
        <hr/>
        <Div>Attendance</Div>
        {members ? members.map((member, index) =>
            <div key={member.id} style={{textAlign:"left",fontSize:"1.2rem", marginTop:"0.8rem"}}>
              {this.isAttendance(member) ?
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(member.id)} name='check circle outline' /> :
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(member.id)} name='times circle outline' />}
              {member.nickname}
            </div>
          ) : <></>}

        {policies.map((policy, index) => (
          <div key={policy.id}>
            <Div>
            {policy.name}
            </Div>
            {members ? members.map((member, index) => (
              <div key={members.id} style={{textAlign:"left",fontSize:"1.2rem", marginTop:"0.8rem"}}>
                {!(fines[policy.id] && fines[policy.id].includes(member.id)) ?
                  <Icon style={{ fontSize: "1.2rem", margin: "0rem"}} onClick={() => this.manageFine(policy.id, member.id)} name='check circle outline'/> :
                  <Icon style={{ fontSize: "1.2rem", margin: "0rem"}} onClick={() => this.manageFine(policy.id, member.id)} name='times circle outline'/>}
                {member.nickname}
              </div>
            )) : <></>}
          </div>
        ))}
      </Wrapper>
  )}
}

const mapStateToProps = state => ({
  policies: state.groupReducer.policies,
})

const mapDispatchToProps = dispatch => ({
  loadPolicies: payload => dispatch(actionCreators.loadPolicies(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPolicyManage)
