import React, { Component } from 'react'
import { connect } from 'react-redux'

class Homepage extends Component {
  constructor(props) {
    super(props)
    const { history, isLoggedIn } = this.props
    if (!isLoggedIn) {
      history.push('login')
    }
  }

  render() {
    return (<div></div>)
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})
const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
