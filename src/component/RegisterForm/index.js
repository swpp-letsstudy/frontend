import React from 'react'
import { Formik } from 'formik/dist/index'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import apis from 'apis'
import routes from 'routes'

import Field from './RegisterField'
import Button from './RegisterButton'
import Form from './RegisterForm'
import Link from './RegisterLink'

const Title = styled.h1`
  padding: 5rem;
  font-size: 2em;
  text-align: center;
  color: black;
  padding: 1rem;
`;

const RegisterForm = (props) => {
  const { history } = props
  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
      nickname: '',
    }}
    onSubmit={(values, formActions) => {
      const { username, password, nickname } = values
      apis.register({ username, password, nickname })
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
            <Field type='nickname' name='nickname' placeholder='nickname' />
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

export default RegisterForm
