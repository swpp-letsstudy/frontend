import React from 'react'
import {Field, Form, Formik} from "formik/dist/index"
import { connect } from 'react-redux'

import * as actions from 'store/actions'
import * as apis from 'apis'

const GroupFormPage = props => {
  const { history, loadGroups } = props
  return (
      <Formik
          initialValues = {{
            name: '',
            info: '',
          }}
          onSubmit={(values, formActions) => {
            const { name, info } = values
            apis.createGroup({ name, info }).then(loadGroups)
            history.push('/')
          }}
          render={()=>
              <Form>
                <Field name='name'/>
                <Field name='info'/>
                <button type='submit'>그룹 생성</button>
              </Form>}
      />
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actions.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupFormPage)
