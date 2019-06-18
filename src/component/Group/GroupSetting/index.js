import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik/dist/index'

import routes from 'routes'
import apis from 'apis'

const GroupSetting = props => {
  const { groupId, history } = props
  return (
    <Formik
      initialValues={{
          amount: 0,
      }}
      onSubmit={(values, formActions) => {
          const { amount } = values
          apis.setAttendanceFine({ groupId, amount })
          .then(history.push(routes.GROUP_DETAIL.replace(':groupId', groupId)))
      }}
      render={() =>
        <>
          <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
            GROUP_DETAIL
          </Link>
          <h1>GroupSetting</h1>
          <Form>
              <Field name='amount' type='number' />
              <button type='submit'>수정</button>
          </Form>
        </>
      }
    />
  )
}

export default GroupSetting
