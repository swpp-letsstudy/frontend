import React from 'react'
import { Field, Form, Formik } from 'formik/dist/index'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'


const GroupForm = props => {
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
            history.push(routes.GROUP_LIST)
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
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
