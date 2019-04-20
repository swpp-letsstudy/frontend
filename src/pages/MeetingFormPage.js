import React from 'react'
import {Field, Form, Formik} from "formik/dist/index";
import queryString from 'query-string/index'
import apis from 'apis'

const MeetingFormPage = props => {
  const { location, history } = props
  const groupId = queryString.parse(location.search).id
  return (
      <Formik
          initialValues={{
            time: '',
            info: '',
          }}
          onSubmit={(values, formActions) => {
            const {time, info} = values
            apis.createMeeting({ info, time, groupId })
            history.push(`group-detail?id=${groupId}`)
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

export default MeetingFormPage
