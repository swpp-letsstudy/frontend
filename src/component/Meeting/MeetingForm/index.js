import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import queryString from 'query-string'

import Field from './MeetingField'
import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Button from './MeetingFormButton'

const MeetingForm = props => {
  const { location, history } = props
  const groupId = queryString.parse(location.search).groupId
  return (
    <Wrapper>
      <Formik
        initialValues={{
          time: '',
          info: '',
        }}
        onSubmit={(values, formActions) => {
          const { time, info } = values
          apis.createMeeting({ info, time, groupId })
          history.push(
            `${routes.GROUP_DETAIL.replace(':id', groupId)}`
          )
        }}
        render={() =>
          <Form>
            <Title>Create Meeting</Title>
            <div>
            <Field type='datetime-local' name='time' />
            </div>
            <div>
              <Field name='info' type='text' placeholder='informations...' style={{ height: "20rem" }} />
            </div>
            <Button type='submit'>미팅 생성</Button>
          </Form>}
      />
    </Wrapper>
  )
}

export default MeetingForm
