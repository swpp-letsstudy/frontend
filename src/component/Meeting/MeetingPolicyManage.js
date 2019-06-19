import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

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
      <>
        <Icon name='chevron left'>
          <Link to={routes.MEETING_DETAIL.replace(':meetingId', meetingId)}>
            MeetingDetail
          </Link>
        </Icon>
        <h2>Attendance</h2>
        {members ? members.map((member, index) =>
            <div key={member.id} style={{textAlign:"left",fontSize:"1.2rem", marginTop:"0.8rem"}}>
              {this.isAttendance(member) ?
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(member.id)} name='check circle outline' /> :
                <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.toggleUserAttendanceHandler(member.id)} name='times circle outline' />}
              {member.nickname}
            </div>
          ) : <></>}

        {policies.map((policy, index) => (
          <h2 key={policy.id}>
            <br />
            {policy.name}
            {members ? members.map((member, index) => (
              <div key={member.id} style={{textAlign:"left",fontSize:"1.2rem", marginTop:"0.8rem"}}>
                {!(fines[policy.id] && fines[policy.id].includes(member.id)) ?
                  <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.manageFine(policy.id, member.id)} name='check circle outline'/> :
                  <Icon style={{ fontSize: "1.2rem"}} onClick={() => this.manageFine(policy.id, member.id)} name='times circle outline'/>}
                {member.nickname}
              </div>
            )) : <></>}
          </h2>
        ))}
      </>
  )}
}

const mapStateToProps = state => ({
  policies: state.groupReducer.policies,
})

const mapDispatchToProps = dispatch => ({
  loadPolicies: payload => dispatch(actionCreators.loadPolicies(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPolicyManage)
