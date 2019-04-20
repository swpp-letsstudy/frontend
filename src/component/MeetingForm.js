import React from 'react'
import {Field, Form, Formik} from "formik";
import queryString from 'query-string'

const MeetingForm = props => {
  const { location, createMeeting, history } = props
  const groupId = queryString.parse(location.search).id
  return (
      <Formik
          initialValues={{
            time: '',
            info: '',
          }}
          onSubmit={(values, formActions) => {
            const {time, info} = values
            createMeeting({ info, time, groupId })
            history.push(`group-detail/${groupId}`)
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
