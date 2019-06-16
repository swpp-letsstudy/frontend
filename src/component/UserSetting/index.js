import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik/dist/index'
import Icon from 'component/Styles/Chevron'

import routes from 'routes'
import actionCreators from 'store/actions'

import Form from './SettingForm'
import Button from './SettingButton'
import Input from './SettingInput'
import Link from './SettingLink'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'



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
      render={({handleChange}) =>
        <Wrapper>
          <Icon name='chevron left'>
          <Link to={routes.GROUP_LIST}>
            GroupList
          </Link>
          </Icon>

          <Title>User Setting</Title>

          <Form>
                <div className="ui action input">
                  <Input
                    onChange={handleChange}
                    name='nickname'
                    type='nickname'
                    placeholder='New Nickname'
                  />
                  <Button type='submit'>
                    변경
                  </Button >

                </div>
              </Form>
          <Button onClick={signout}>
            탈퇴
          </Button>
          
        </Wrapper>
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
