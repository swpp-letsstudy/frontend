import React from 'react'
import {Field, Form, Formik} from "formik/dist/index";
import queryString from 'query-string/index'
import {connect} from "react-redux";
import * as actions from 'store/actions'

const MeetingFormPage = props => {
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  createMeeting: ({ time, info, groupId }) => dispatch(actions.createMeeting({time, info, groupId})),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingFormPage)
