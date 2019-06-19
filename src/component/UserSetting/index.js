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

          <div style={{textAlign:"right",size:"1.2rem"}}>
            탈퇴 <Icon name='sign-out' onClick={signout}></Icon>
          </div>

          <Title style={{marginTop:'0rem'}}>User Setting</Title>
          <hr/>
          <Form>
                <div className="ui action input">
                  <Input
                    onChange={handleChange}
                    name='nickname'
                    type='nickname'
                    placeholder='New Nickname'
                  />
                  <Button type='submit' basic color='black' animated style={{textAlign:"center"}}>
                    <Button.Content visible>
                      변경
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name='pencil alternate' />
                    </Button.Content>
                  </Button >

                </div>
              </Form>          
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
