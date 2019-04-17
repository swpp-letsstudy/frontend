import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import GroupList from './GroupList'

import * as actions from '../store/actions'

class Homepage extends Component {
  constructor(props) {
    super(props)

    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      return <Redirect to='login/' />
    }
    return <GroupList groups={this.props.groups} />
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  groups: state.groupReducer.groups,
})
const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actions.loadGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
