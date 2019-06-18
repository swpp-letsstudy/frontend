import React, { Component, Fragment } from 'react'
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
      members: [],
      fines: [],
    }
  }

  componentDidMount() {
    const { loadPolicies, groupId, meetingId } = this.props
    apis.readMeeting({ meetingId })
      .then(value => this.setState({
        members: value.data.group.members
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
  
  render() {
    const { meetingId, policies } = this.props
    const { members, fines } = this.state
    return (
      <>
        <Icon name='chevron left'>
          <Link to={routes.MEETING_DETAIL.replace(':meetingId', meetingId)}>
            MeetingDetail
          </Link>
        </Icon>
        {policies.map((policy, index) => (
          <h2 key={policy.id}>
            {policy.name}
            {members ? members.map((member, index) => (
              <Fragment key={member.id}>
                <div>{member.nickname}</div>
                <div onClick={() => this.manageFine(policy.id, member.id)}>{fines[policy.id] && fines[policy.id].includes(member.id) ? 'X' : 'O'}</div>
              </Fragment>
            )) : <></>}
          </h2>
        ))}
        <div>MeetingPolicyManage</div>
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
