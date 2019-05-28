import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import routes from 'routes'
import Icon from 'component/Styles/Chevron'

const UserSetting = props => {
  return (
    <>
      <Icon name='chevron left'>
      <Link to={routes.GROUP_LIST}>
        GroupList
      </Link>
      </Icon>
      <h1>UserSetting</h1>
    </>
  )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)
