import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LogoutButton from "../component/LogoutButton"

import * as actions from 'store/actions'

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
                <Link to={`/group-detail?id=${group.id}`}>{group.name}</Link>
                <br/>
              </Fragment>
          ))}
          <Link to='/group-form'>그룹 생성</Link>
        </>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actions.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupListPage)
