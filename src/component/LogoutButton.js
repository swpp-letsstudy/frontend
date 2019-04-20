import {Form, Formik} from "formik"
import React from "react"
import {connect} from "react-redux"
import * as actions from 'store/actions'

const LogoutButton = props => {
  const { history, logout } = props
  return (
      <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(values, formActions) => {
            logout().then(history.push('login/'))
          }}
          render={() =>
              <Form>
                <button type='submit'>로그아웃</button>
              </Form>}
      />
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
