import React from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form } from 'formik/dist/index'

import apis from 'apis'
import routes from 'routes'
import actionCreators from 'store/actions'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'

const PolicyForm = props => {
  const { loadPolicies, groupId, history } = props
  console.log(groupId)
  return (
    <Formik
      initialValues={{
        name: '',
        info: '',
        amount: 0,
      }}
      onSubmit={(values, formActions) => {
        const { name, info, amount } = values
        apis.createPolicy({ name, info, amount, groupId }).then(loadPolicies({ groupId }))
        history.push({
          pathname: routes.POLICY_LIST,
          state: { groupId },
        })
      }}
      render={() =>
        <Wrapper>
          <Icon name='chevron left'>
          <Link to={{
            pathname: routes.POLICY_LIST,
            state: { groupId },
          }}>
            PolicyList
          </Link>
          </Icon>
          <Title>Create Policy</Title>
          <Form>
            <Field name='name' type='text' />
            <Field name='info' type='text' />
            <Field name='amount' type='number' />
            <button type='submit'>벌금 생성</button>
          </Form>
        </Wrapper>
      }
    />
  )
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadPolicies: payload => dispatch(actionCreators.loadPolicies(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PolicyForm)
