import React from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Formik } from 'formik/dist/index'
import { Icon } from 'semantic-ui-react'

import Field from './LoginField'
import Button from './LoginButton'
import Form from './LoginForm'
import Link from './LoginLink'


import actionCreators from 'store/actions'
import Title from 'component/Styles/Title'



const LoginForm = props => {
  const { isLoggedIn, login } = props
  return (isLoggedIn
    ? <Redirect to='/' />
    : <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values, formActions) => {
        const { username, password } = values
        login({ username, password })
      }}
      render={() =>
        <Form>
          <Title>Login Page</Title>
          <div>
              <Field name='username' placeholder='username' />
          </div>

          <div>
              <Field type='password' name='password' placeholder='password' />
          </div>

          <div>
            <Button animated type='submit'>
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden><Icon name='arrow right' /></Button.Content>
            </Button>
          </div>
          <Link to={`/register`} >
            if you don't have an account...
          </Link>
        </Form>
      }
    />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actionCreators.login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
