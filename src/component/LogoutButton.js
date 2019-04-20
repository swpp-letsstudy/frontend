import React from 'react'
import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import { Redirect } from 'react-router-dom'

import routes from 'routes'

const LogoutButton = props => {
  const { isLoggedIn, logout } = props
  return (isLoggedIn
      ? <button onClick={logout}>로그아웃</button>
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
