import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import apis from 'apis'
import routes from 'routes'

class PolicyDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      policy: {},
    }
  }

  componentDidMount() {
    const { policyId, groupId } = this.props
    apis.readPolicy({ policyId, groupId })
    .then(value => this.setState({
      policy: value.data,
    }))
  }

  deletePolicy = () => {
    const { policyId, groupId, history } = this.props
    apis.deletePolicy({ policyId, groupId })
    history.push({
      pathname: routes.POLICY_LIST,
      state: { groupId },
    })
  }

  render() {
    const { policy } = this.state
    const { groupId } = this.props
    console.log(policy)
    return (
      <>
        <Link to={{
          pathname: routes.POLICY_LIST,
          state: { groupId },
        }}>
          POLICY_LIST
        </Link>
        <h1>INFO</h1>
        <h2>{policy.info}</h2>
        <h1>NAME</h1>
        <h2>{policy.name}</h2>
        <button onClick={this.deletePolicy}>삭제</button>
      </>
    )
  }
}

export default PolicyDetail
