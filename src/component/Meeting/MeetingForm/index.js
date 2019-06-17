import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { connect } from 'react-redux'

import Field from './MeetingField'
import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Button from './MeetingFormButton'
import Link from './MeetingFormLink'

const MeetingForm = props => {
  const { groupId, history, loadMeetings } = props
  return (
    <Wrapper>
      <Icon name='chevron left'>
        <Link to={`/groups/${groupId}`}>
          MeetingList
        </Link>
      </Icon>
      <Formik
        initialValues={{
          time: '',
          info: '',
        }}
        onSubmit={(values, formActions) => {
          const { time, info } = values
          apis.createMeeting({ info, time, groupId }).then(
            loadMeetings({ groupId })
          )
          history.push(
            `${routes.GROUP_DETAIL.replace(':groupId', groupId)}`
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

const mapStateToProps = state => ({
  meetings: state.groupReducer.meetings,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MeetingForm)
