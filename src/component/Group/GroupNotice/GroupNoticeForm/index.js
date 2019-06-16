import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Formik, Field } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'
import Icon from 'component/Styles/Chevron'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'
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
          pathname: routes.GROUP_NOTICE_LIST,
          state: { groupId },
        })
      }}
      render={() =>
        <>
          <Icon name='chevron left'>
            <Link to={{
              pathname: routes.GROUP_NOTICE_LIST,
              state: { groupId },
            }}>
              GroupDetail
            </Link>
          </Icon>
          <h1>Create GroupNotice</h1>
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
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupNoticeForm)
