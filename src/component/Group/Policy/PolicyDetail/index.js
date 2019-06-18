import React, { Component } from 'react'

import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

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
      <Wrapper>
        <Icon name='chevron left'>
        <Link to={{
          pathname: routes.POLICY_LIST,
          state: { groupId },
        }}>
          PolicyList
        </Link>
        </Icon>
        <div style={{textAlign:"right",size:"1.2rem"}}>
          <Icon name='trash alternate outline' onClick={this.deletePolicy}></Icon>
        </div>
        <Title style={{marginTop:'0rem'}}>{policy.name}</Title>
        <hr/>
        <h2>{policy.info}</h2>
        
      </Wrapper>
    )
  }
}

export default PolicyDetail
