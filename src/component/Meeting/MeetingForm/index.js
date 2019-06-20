import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { connect } from 'react-redux'

import Field from './MeetingField'
import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'
import { Button } from 'semantic-ui-react'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Div from 'component/Styles/Div'

import Link from 'component/Styles/Link'

const MeetingForm = props => {
  const { groupId, history, loadMeetings } = props
  return (
      <Formik
        initialValues={{
          time: '',
          info: '',
        }}
        onSubmit={(values, formActions) => {
          const { time, info } = values
          if(info ==='' | info.length > 20){
            alert('Wrong Input')
          }else{
            apis.createMeeting({ info, time, groupId }).then(
              loadMeetings({ groupId })
            )
            history.push({
              pathname: routes.MEETING_LIST,
              state: { groupId },
            })
          }
          
        }}
        render={() =>
          <Wrapper>

            <Icon name='chevron left'>
              <Link to={`/groups/${groupId}`}>
                MeetingList
              </Link>
            </Icon>

            <Title>Create Meeting</Title>
            <hr/>
            <Form>
              <div>
              <Div style={{textDecoration:"none", textAlignLast:"center"}}>
                시간
              </Div>
              <Field component='input' type='datetime-local' name='time' />
              <Div style={{textDecoration:"none", textAlignLast:"center"}}>
                정보
              </Div>
              <Field style={{height:"20rem",borderColor:"black", borderWidth:"2px"}} component='textarea' name='info' type='text' placeholder='informations...' />
              </div>
              <br/>
              <Button basic color='black' animated type='submit' style={{width: "100%", fontSize: "1.5rem", fontWeight: "20"}}>
                <Button.Content visible>
                  미팅 생성
                </Button.Content>
                <Button.Content hidden>
                  <Icon style={{paddingTop: "0rem"}} name='add' />
                </Button.Content>
              </Button>
            </Form>
          </Wrapper>}
      />
  )
}

const mapStateToProps = state => ({
  meetings: state.groupReducer.meetings,
})

const mapDispatchToProps = dispatch => ({
  loadMeetings: payload => dispatch(actionCreators.loadMeetings(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MeetingForm)
