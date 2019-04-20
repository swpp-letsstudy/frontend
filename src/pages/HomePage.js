import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const HomePage = props => {
  const { isLoggedIn } = props
  return isLoggedIn ?
      <Redirect to={'group-list/'} />
      : <Redirect to={'login/'}/>
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
