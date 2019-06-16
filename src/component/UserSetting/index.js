import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik/dist/index'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

import routes from 'routes'
import actionCreators from 'store/actions'

const Title = styled.h1`
  padding: 5rem;
  font-size: 2em;
  text-align: center;
  color: black;
  padding: 1rem;
`;

const UserSetting = props => {
  const { history, updateUserSetting, signout } = props
  return (
    <Formik
      initialValues={{
        nickname: '',
      }}
      onSubmit={(values, formActions) => {
        const { nickname } = values
        updateUserSetting({ nickname })
        history.push(routes.GROUP_LIST)
      }}
      render={() =>
        <>
          <Form>
            <Icon name='chevron left'>
            <Link to={routes.GROUP_LIST}>
              GroupList
            </Link>
            </Icon>
            <Title>UserSetting Page</Title>
            <div>
                <Field type='nickname' name='nickname' placeholder='nickname' />
            </div>

            <div>
              <Button animated type='submit'>
                <Button.Content visible>Update</Button.Content>
                <Button.Content hidden><Icon name='arrow right' /></Button.Content>
              </Button>
            </div>
          </Form>
          <Button onClick={signout}>
            탈퇴
          </Button>
        </>
      }
    />
  )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
  updateUserSetting: payload => dispatch(actionCreators.updateUserSetting(payload)),
  signout: () => dispatch(actionCreators.signout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)
