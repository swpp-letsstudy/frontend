import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import GroupList from 'component/GroupList'
import { Formik, Form } from 'formik'

import * as actions from 'store/actions'

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
    return (
      <>
        <Formik
          initialValues = {{
            username: '',
            password: '',
          }}
          onSubmit={(values, formActions) => {
            this.props.logout()
          }}
          render={()=>
            <Form>
                <button type='submit'>로그아웃</button>    
            </Form>}
        />
        <GroupList groups={this.props.groups} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  groups: state.groupReducer.groups,
})
const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actions.loadGroups()),
  logout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
