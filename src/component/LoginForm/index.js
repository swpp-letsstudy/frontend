import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Icon } from 'semantic-ui-react'
import Field from './LoginField'
import Button from './LoginButton'

import styled from 'styled-components';

import actionCreators from 'store/actions'

const Title = styled.h1`
  padding: 5rem;
  font-size: 2em;
  text-align: center;
  color: black;
  padding: 1rem;
`;

const Wrapper1 = styled.section`
  text-align: center;
  padding: 1rem;
`;


class LoginForm extends Component {
  render() {
    const { isLoggedIn, login } = this.props
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
            <Wrapper1>
                <Field name='username' style={{ width: "30rem" }} placeholder='username' />
            </Wrapper1>

            <Wrapper1>
                <Field type='password' name='password' style={{ width: "30rem" }} placeholder='password' />
            </Wrapper1>
            <Wrapper1>
              <Button animated type='submit' style={{ width: "30rem" }}>
                <Button.Content visible>
                  LOGIN
                    </Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Wrapper1>
          </Form>
        }
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
