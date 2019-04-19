import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import GroupList from 'component/GroupList'
import { Formik, Form } from 'formik'

import * as actions from 'store/actions'
import GroupForm from 'component/GroupForm'

class Homepage extends Component {
  constructor(props) {
    super(props)

    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { isLoggedIn, match } = this.props
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
          <Route
              exact
              path={`${match.path}`}
              component={() =>
                <GroupList {...this.props} groups={this.props.groups} />}
          />
          <Route
              path={`${match.path}group-form`}
              component={() => <GroupForm {...this.props} />}
          />
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
  createGroup: (name, info) => dispatch(actions.createGroup({name, info})),
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
