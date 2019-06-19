import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import routes from 'routes'
import apis from 'apis'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

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
    return (
      <Wrapper>

        <Icon name='chevron left'>
          <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
            GroupDetail
          </Link>
        </Icon>

        <Title>총 벌금: {sum}</Title>
        <hr/>
        {myFines ? Object.keys(myFines).map((meeting, index) => (
          <Fragment key={meeting}>
            <Div>{meeting}</Div>
            {myFines[meeting] ? myFines[meeting].map((fine, index) => (
              <Fragment key={fine.id}>
                <div
                style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}
                >
                {fine.policy.name}: {fine.policy.amount}
                </div>
                
              </Fragment>
            )) : <></>}
          </Fragment>
        )) : <></>}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  setInfo: payload => dispatch(actionCreators.setInfo(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyPolicyForm)
