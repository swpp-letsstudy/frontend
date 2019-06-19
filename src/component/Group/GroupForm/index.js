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

const GroupForm = props => {
  const { history, loadGroups } = props
  return (
    <Formik
      initialValues={{
        name: '',
        info: '',
      }}
      onSubmit={(values, formActions) => {
        const { name, info } = values
        apis.createGroup({ name, info }).then(loadGroups)
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
