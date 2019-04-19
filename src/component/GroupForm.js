import React from 'react'
import {Field, Form, Formik} from "formik";

const GroupForm = props => {
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

export default GroupForm
