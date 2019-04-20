import React from "react"
import {connect} from "react-redux"
import * as actions from 'store/actions'
import { Redirect } from 'react-router-dom'

const LogoutButton = props => {
  const { isLoggedIn, logout } = props
  return (isLoggedIn
      ? <button onClick={logout}>로그아웃</button>
      : <Redirect to='/login' />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
