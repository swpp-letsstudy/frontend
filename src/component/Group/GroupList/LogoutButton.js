import React from 'react'
import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import { Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Button from './GroupButton'

import routes from 'routes'



const LogoutButton = props => {
  const { isLoggedIn, logout } = props
  return (isLoggedIn
    ?
    <div>

      <Link to={routes.GROUP_FORM} style={{ color: '#FFF' }}>
        <Button animated>
          <Button.Content visible>
            그룹 생성
          </Button.Content>
          <Button.Content hidden>
            <Icon name='group' />
          </Button.Content>
        </Button >
      </Link>

      <Link to={routes.USER_SETTING} style={{ color: '#FFF' }}>
        <Button animated>
          <Button.Content visible>
            설정
          </Button.Content>
          <Button.Content hidden>
            <Icon name='setting' />
          </Button.Content>
        </Button >
      </Link>

      <Button animated onClick={logout}>
        <Button.Content visible>
          LOGOUT
        </Button.Content>
        <Button.Content hidden>
          <Icon name='x' />
        </Button.Content>
      </Button>
    </div>
    : <Redirect to={routes.LOGIN} />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
