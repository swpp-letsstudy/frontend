import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'
import Icon from 'component/Styles/Chevron'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'

import Link from './GroupLink'
import Field from './NoticeField'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import apis from 'apis'
import routes from 'routes'

const GroupNoticeForm = props => {
  const { history, groupId, loadGroupNotices } = props
  return (
    <Formik
      initialValues={{
        title: '',
        contents: '',
      }}
      onSubmit={(values, formActions) => {
        const { title, contents } = values
        apis.createGroupNotice({ groupId, title, contents }).then(loadGroupNotices({ groupId }))
        history.push({
          pathname: routes.GROUP_DETAIL.replace(':groupId', groupId),
          state: { groupId },
        })
      }}
      render={() =>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
              MeetingList
            </Link>
          </Icon>
          <Title>Create Group Notice</Title>
          <Form>
            <Field name='title'/>
            <Field name='contents'/>
            <Button type='submit'>그룹 공지 생성</Button>
          </Form>
        </ Wrapper>
      }
    />
  )
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNoticeForm)
