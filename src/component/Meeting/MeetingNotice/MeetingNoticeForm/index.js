import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Formik, Field } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'
import Icon from 'component/Styles/Chevron'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

const MeetingNoticeForm = props => {
  const { history, meetingId, loadMeetingNotices } = props
  return (
    <Formik
      initialValues={{
        title: '',
        contents: '',
      }}
      onSubmit={(values, formActions) => {
        const { title, contents } = values
        apis.createMeetingNotice({ meetingId, title, contents }).then(loadMeetingNotices({ meetingId }))
        history.push({
          pathname: routes.MEETING_NOTICE_LIST,
          state: { meetingId },
        })
      }}
      render={() =>
        <>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.MEETING_NOTICE_LIST,
              state: { meetingId },
            }}>
              MeetingDetail
            </Link>
          </Icon>
          <h1>Create Meeting Notice</h1>
          <Form>
            <Field name='title'/>
            <Field name='contents'/>
            <Button type='submit'>그룹 공지 생성</Button>
          </Form>
        </>
      }
    />
  )
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadMeetingNotices: payload => dispatch(actionCreators.loadMeetingNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingNoticeForm)
