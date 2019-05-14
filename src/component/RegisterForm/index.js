import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Formik } from 'formik/dist/index'
import { Icon } from 'semantic-ui-react'

import Field from './RegisterField'
import Button from './RegisterButton'
import Form from './RegisterForm'
import Link from './RegisterLink'

import styled from 'styled-components';

import actionCreators from 'store/actions'

import routes from 'routes'

const Title = styled.h1`
  padding: 5rem;
  font-size: 2em;
  text-align: center;
  color: black;
  padding: 1rem;
`;


class RegisterForm extends Component {
  render() {
    const { history, register } = this.props
    return (
        <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values, formActions) => {
          const { username, password } = values
          register({ username, password })
          history.push(routes.LOGIN)
        }}
        render={() =>
          <Form>
            <Title>Register Page</Title>
            <div>
                <Field name='username' placeholder='username' />
            </div>

            <div>
                <Field type='password' name='password' placeholder='password' />
            </div>

            <div>
              <Button animated type='submit'>
                <Button.Content visible>Register</Button.Content>
                <Button.Content hidden><Icon name='arrow right' /></Button.Content>
              </Button>
            </div>
            <Link to={routes.LOGIN} >
              if you already have an account...
            </Link>
          </Form>
        }
      />)
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(actionCreators.register(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
