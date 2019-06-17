import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import routes from 'routes'
import apis from 'apis'

class MyPolicyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sum: 0,
      myFines: [],
    }
  }

  componentDidMount() {
    const { groupId } = this.props
    apis.readMyFines({ groupId })
    .then(value => this.setState({
      myFines: value.data,
    }))
    apis.getFineSum({ groupId })
    .then(value => this.setState({
      sum: value.data,
    }))
  }
  
  render() {
    const { groupId } = this.props
    const { myFines } = this.state
    return (
      <>
        <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
          GroupDetail
        </Link>
        <br />
        <Link to={{
          pathname: routes.POLICY_LIST,
          state: { groupId },
        }}>
          PolicyList
        </Link>
        <br />
        {myFines.map((fine, index) => {
          const info = fine.meeting_fine
          return (
          <Fragment key={fine.id}>
            <Link to={routes.MEETING_DETAIL.replace(':meetingId', info.meeting.id)}>{info.meeting.info}</Link>
            <div>{info.policy.name} {info.policy.amount}</div>
            <br />
          </Fragment>
        )})}
        <div>MyPolicyForm</div>
      </>
    )
  }
}

export default MyPolicyForm
