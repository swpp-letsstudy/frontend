import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

import Field from './NoticeField'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

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
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              제목
            </Div>
            <Field component='input' name='title'/>
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              내용
            </Div>
            <Field style={{borderColor:"black", borderWidth:"2px"}} component='textarea' name='contents'/>
            
            <br/>
            <br/>
            <br/>

            <Button basic color='black' animated type='submit' style={{width: "100%", fontSize: "1.5rem", fontWeight: "20"}}>
              <Button.Content visible>
                미팅 공지 생성
              </Button.Content>
              <Button.Content hidden>
                <Icon style={{paddingTop: "0rem"}} name='add' />
              </Button.Content>
            </Button>
            
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
