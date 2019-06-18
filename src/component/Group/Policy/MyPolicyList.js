import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actionCreators from 'store/actions'
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
    const { groupId, setInfo } = this.props
    setInfo({
      groupId,
      backurl: routes.MY_POLICY_LIST,
    })
    apis.readMyGroupFines({ groupId })
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
    const { myFines, sum } = this.state
    console.log(myFines)
    return (
      <>
        <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
          GroupDetail
        </Link>
        <br />
        
        <br />
        <h1>총 벌금: {sum}</h1>
        <br />
        <br />
        <br />
        {myFines.map((fine, index) => (
          <Fragment key={fine.id}>
            <div>{fine.meeting.info} {fine.policy.name}</div>
            <h1>{fine.policy.amount}</h1>
            <br />
            <br />
          </Fragment>
        ))}
      </>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  setInfo: payload => dispatch(actionCreators.setInfo(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyPolicyForm)
