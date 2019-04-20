import React from 'react'
import {Field, Form, Formik} from "formik/dist/index"
import { connect } from 'react-redux'

import * as actions from 'store/actions'

const GroupFormPage = props => {
  const { createGroup, loadGroups, history } = props
  return (
      <Formik
          initialValues = {{
            name: '',
            info: '',
          }}
          onSubmit={(values, formActions) => {
            const { name, info } = values
            createGroup(name, info).then(loadGroups)
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
  createGroup: (name, info) => dispatch(actions.createGroup({name, info})),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupFormPage)
