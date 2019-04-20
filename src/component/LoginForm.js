import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import actionCreators from 'store/actions'

class LoginForm extends Component {
  render() {
    const { isLoggedIn, login } = this.props
    return (isLoggedIn
        ? <Redirect to='/'/>
        : <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(values, formActions) => {
              const {username, password} = values
              login({username, password})
            }}
            render={() =>
                <Form>
                  <Field name='username'/>
                  <Field type='password' name='password'/>
                  <button type='submit'>로그인</button>
                </Form>}
        />)
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actionCreators.login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
