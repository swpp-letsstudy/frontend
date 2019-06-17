import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'
import actionCreators from 'store/actions'

class PolicyList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      group: {},
    }
  }

  componentDidMount() {
    const { groupId, loadPolicies } = this.props
    loadPolicies({ groupId })
    apis.readGroup({ groupId })
    .then(value => this.setState({
      group: value.data,
    }))
  }
  
  render() {
    const { policies, groupId, nickname } = this.props
    const { owner } = this.state.group
    return (
      <>
        <Link to={{
          pathname: routes.MY_POLICY_LIST,
          state: { groupId },
        }}>
          MyPolicyList
        </Link>
        <br />
        {policies.map((policy, index) => (
          <Fragment key={policy.id}>
            <Link to={{
              pathname: routes.POLICY_DETAIL.replace(':policyId', policy.id),
              state: { groupId },
            }}>
              {policy.name}
              <br />
              {policy.info}
            </Link>
          </Fragment>
        ))}
        {owner===nickname ? <Link to={{
          pathname: routes.POLICY_FORM,
          state: { groupId },
        }}>
          추가
        </Link> : <></>}
      </>
    )
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.user.nickname,
  policies: state.groupReducer.policies,
})

const mapDispatchToProps = dispatch => ({
  loadPolicies: payload => dispatch(actionCreators.loadPolicies(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList)
