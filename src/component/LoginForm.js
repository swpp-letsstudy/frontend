import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Formik, Form, Field } from 'formik';

import * as actions from '../store/actions'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <Formik
        initialValues = {{
          username: '',
          password: '',
        }}
        onSubmit={(values, formActions) => {
          const { username, password } = values
          this.props.login(username, password)
        }}
        render={props => (
          <Form>
            <Field name='username'/>
            <Field type='password' name='password'/>
            <button type='submit'>로그인</button>
          </Form>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
