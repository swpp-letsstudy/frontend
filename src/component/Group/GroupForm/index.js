import React, { Component } from 'react'
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

class GroupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      days: ['월', '화', '수', '목', '금', '토', '일'],
      englishdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      toggle: [false, false, false, false, false, false, false],
    }
  }

  init_days = () => {
    this.setState({
      toggle: [false, false, false, false, false, false, false],
    })
  }
  
  toggleDay = idx => {
    let preToggle = this.state.toggle
    preToggle[idx] = !preToggle[idx]
    this.setState({
      toggle: preToggle,
    })
  }

  render() {
    const { history, loadGroups } = this.props
    const { days, englishdays, toggle } = this.state
    let initialValues = {
      name: '',
      info: '',
      startday: '',
      endday: '',
      time: '',
    }
    for(let i = 0; i < 7; i++) {
      initialValues[englishdays[i]] = toggle[i]
    }
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formActions) => {
          const { name, info, startday, endday, time } = values
          for (let i = 0; i < 7; i++) {
            values[englishdays[i]] = toggle[i]
          }
          if (name==='' || info==='' || time==='' || startday==='' || endday==='' || startday >= endday || name.length >20 || info.length >100) {
            alert('Wrong Input')
          } else {
            apis.createGroup(values).then(loadGroups)
            this.init_days()
            history.push(routes.GROUP_LIST)
          }
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
              
              {days.map((day, index) => (
                <Checkbox key={day} label={day} onChange ={()=>this.toggleDay(index)} name={englishdays[index]}/>
              ))}
                
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
  )}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
