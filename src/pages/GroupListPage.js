import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoutButton from 'component/LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'

class GroupListPage extends Component {

  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const {groups} = this.props
    return (
        <>
          <LogoutButton/>
          {groups.map((group, index) => (
              <Fragment key={index}>
                <Link to={`${routes.GROUP_DETAIL.replace(':id', group.id)}`}>
                  {group.name}
                </Link>
                <br/>
              </Fragment>
          ))}
          <Link to={routes.GROUP_FORM}>그룹 생성</Link>
        </>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupListPage)
