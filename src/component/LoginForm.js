import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import * as actions from 'store/actions'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Redirect to='/' />
    }
    return (
      // <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      //   <Grid.Column style={{ maxWidth: 450 }}>
      //     <Header as='h2' color='teal' textAlign='center'>
      //       Log-in to your account
      //     </Header>
            <Formik
              initialValues = {{
                username: '',
                password: '',
              }}
              onSubmit={(values, formActions) => {
                const { username, password } = values
                this.props.login(username, password)
              }}
              render={()=>
                <Form>
                    <Field name='username'/>
                    <Field type='password' name='password'/>
                    <button type='submit'>로그인</button>    
                </Form>}
            />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
