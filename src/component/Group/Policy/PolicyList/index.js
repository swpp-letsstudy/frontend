import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import apis from 'apis'
import routes from 'routes'
import actionCreators from 'store/actions'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Link from './PolicyLink'
import Div from './PolicyDiv'

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
      <Wrapper>

        <Icon name='chevron left'>
          <Link to={{
            pathname: routes.GROUP_DETAIL.replace(':groupId', groupId),
            state: { groupId },
          }}>
          
            GroupDetail
          </Link>
        </Icon>
        <Title>Fine List</Title>
        <hr />
        {policies.map((policy, index) => (
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
          <Fragment key={policy.id}>
            <Link to={{
              pathname: routes.POLICY_DETAIL.replace(':policyId', policy.id),
              state: { groupId },
            }}>
              <Div>
              {policy.name}
              </Div>
              {policy.info}
            </Link>
          </Fragment>
          </div>
        ))}
        {owner===nickname ? 
        <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
        <Link to={{
          pathname: routes.POLICY_FORM,
          state: { groupId },
        }}>

          추가
        </Link>
        </div> : <></>}
      </Wrapper>
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
