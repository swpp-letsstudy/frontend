import React from 'react'
import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import { Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import Link from './GroupLink'

import Button from './GroupLogout'

import routes from 'routes'



const LogoutButton = props => {
  const { isLoggedIn, logout } = props
  return (isLoggedIn
    ?
    <div>
      <Button animated onClick={logout}>
        <Button.Content visible>
          LOGOUT
        </Button.Content>
        <Button.Content hidden>
          <Icon name='x' />
        </Button.Content>
      </Button>
      <Link to={routes.USER_SETTING}>설정</Link>
      <Link to={routes.GROUP_FORM}>그룹 생성</Link>
    </div>
    : <Redirect to={routes.LOGIN} />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
