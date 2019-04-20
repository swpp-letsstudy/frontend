import React from 'react'
import {Redirect, Route} from "react-router-dom"
import {connect} from "react-redux"
import routes from 'routes'

const PrivateRoute = props => {
  const { isLoggedIn } = props
  return (isLoggedIn
      ? <Route {...props} />
      : <Redirect to={routes.LOGIN}/>
    )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
