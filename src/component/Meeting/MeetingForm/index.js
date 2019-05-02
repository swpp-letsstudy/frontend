import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import queryString from 'query-string'

import Field from './MeetingField'
import apis from 'apis'
import routes from 'routes'

const MeetingForm = props => {
  const { location, history } = props
  const groupId = queryString.parse(location.search).groupId
  return (
      <Formik
          initialValues={{
            time: '',
            info: '',
          }}
          onSubmit={(values, formActions) => {
            const {time, info} = values
            apis.createMeeting({ info, time, groupId })
            history.push(
                `${routes.GROUP_DETAIL.replace(':id', groupId)}`
            )
          }}
          render={() =>
              <Form>
                <Field type='datetime-local' name='time'/>
                <Field name='info'/>
                <button type='submit'>미팅 생성</button>
              </Form>}
      />
  )
}

export default MeetingForm
