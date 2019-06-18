import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

import Link from './MeetingLink'
import Field from './NoticeField'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

const MeetingNoticeForm = props => {
  const { history, meetingId, loadMeetingNotices } = props
  console.log(meetingId)
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
          pathname: routes.MEETING_DETAIL.replace(':meetingId', meetingId),
          state: { meetingId },
        })
      }}
      render={() =>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.MEETING_DETAIL.replace(':meetingId', meetingId),
              state: { meetingId },
            }}>
              MeetingDetail
            </Link>
          </Icon>
          <Title>Create Meeting Notice</Title>
          <Form style={{width: '25rem'}}>
            <Field name='title'/>
            <Field name='contents'/>
            <Button type='submit'>미팅 공지 생성</Button>
          </Form>
        </Wrapper>
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
