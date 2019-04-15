import React, { Component } from 'react'
import {connect} from "react-redux"

// import * as actions from '../store/actions'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   const { username, password } = this.state
  //   this.props.fetchLogin(username, password)
  // }

  // handleInputChange = event => {
  //   const { name, value } = event.target
  //   this.setState({
  //     [name]: value
  //   })
  // }

  render() {
    return (
      <div>로그인
        {/* <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' onChange={this.handleInputChange} />
          <input type='text' name='password' onChange={this.handleInputChange} />
          <button>로그인</button>
        </form> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
