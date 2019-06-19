import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import Field from './GroupFormField'
import Checkbox from './GroupFormCheckbox'

let monday, tuesday, wednesday, thursday, friday, saturday, sunday;

const GroupForm = props => {
  const { history, loadGroups } = props
  return (
    <Formik
      initialValues={{
        name: '',
        info: '',
      }}
      onSubmit={(values, formActions) => {
        
        const { name, info, startday, endday, time } = values
        apis.createGroup({ name, info, startday, endday, monday, tuesday, wednesday, thursday, friday, saturday, sunday, time}).then(loadGroups)
        init_days()
        history.push(routes.GROUP_LIST)
      }}

      render={() =>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={`/groups`}>
              GroupList
            </Link>
          </Icon>
          <Title>Create Group</Title>
          <hr/>
          <Form style={{width: '25rem'}}>
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              그룹 이름
            </Div>
            <Field component='input' name='name' placeholder='Group Name' />
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              그룹 정보
            </Div>
            <Field style={{borderColor:"black", borderWidth:"2px", height:"20rem"}} component='textarea' name='info' placeholder='Informations...'/>
            
            <Field style={{borderColor:"black", borderWidth:"2px"}} name='startday' type='date' />
            <Field style={{borderColor:"black", borderWidth:"2px"}} name='endday' type='date' />
            
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              스터디 요일
            </Div>
            {init_days}
            <Checkbox label = '월' onChange ={ togglemonday } name = 'monday'></Checkbox>
            <Checkbox label = '화' onChange ={ toggletuesday } name = 'tuesday'></Checkbox>
            <Checkbox label = '수' onChange ={ togglewednesday } name = 'wednesday'></Checkbox>
            <Checkbox label = '목' onChange ={ togglethursday } name = 'thursday'></Checkbox>
            <Checkbox label = '금' onChange ={ togglefriday } name = 'friday'></Checkbox>
            <Checkbox label = '토' onChange ={ togglesaturday } name = 'saturday'></Checkbox>
            <Checkbox label = '일' onChange ={ togglesunday } name = 'sunday'></Checkbox>
              
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>
              스터디 시간
            </Div>
            <Field style={{borderColor:"black", borderWidth:"2px"}} name ='time' type='time' />
            
            <br/>
            <br/>

            <Button basic color='black' animated type='submit' style={{width: "100%", fontSize: "1.5rem", fontWeight: "20"}}><Button.Content visible>
                그룹 생성
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
const init_days = () => {
  monday=tuesday=wednesday=thursday=friday=saturday=sunday=false
}
const togglemonday = () => {
    monday = !monday
}
const toggletuesday = () => {
    tuesday = !tuesday
}
const togglewednesday = () => {
    wednesday = !wednesday
}
const togglethursday = () => {
    thursday = !thursday
}
const togglefriday = () => {
    friday = !friday
}
const togglesaturday = () => {
    saturday = !saturday
}
const togglesunday = () => {
    sunday = !sunday
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
