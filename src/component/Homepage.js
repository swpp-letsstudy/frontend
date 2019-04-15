import React, { Component } from 'react'
import { connect } from 'react-redux'
import GroupList from './GroupList'

import * as actions from '../store/actions'

class Homepage extends Component {
  constructor(props) {
    super(props)
    const { history, isLoggedIn, loadGroups } = this.props
    if (!isLoggedIn) {
      history.push('login')
    }
    loadGroups()
  }

  render() {
    return <GroupList groups={this.props.groups} />
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  groups: state.groupReducer,
})
const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actions.loadGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
