import React from 'react'
import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import { Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import Button from './GroupLogout'

import routes from 'routes'



const LogoutButton = props => {
  const { isLoggedIn, logout } = props
  return (isLoggedIn
    ?

      <Button animated onClick={logout}>
        <Button.Content visible>
          LOGOUT
        </Button.Content>
        <Button.Content hidden>
          <Icon name='x'/>
        </Button.Content>
      </Button>
      

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
