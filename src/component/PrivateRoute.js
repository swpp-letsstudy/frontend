import React from 'react'
import {Redirect, Route} from "react-router-dom"
import {connect} from "react-redux"

const PrivateRoute = props => {
  const { isLoggedIn } = props
  return (isLoggedIn
      ? <Route {...props} />
      : <Redirect to='/login'/>
    )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
