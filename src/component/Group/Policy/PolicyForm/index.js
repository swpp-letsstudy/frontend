import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'

import apis from 'apis'
import routes from 'routes'
import actionCreators from 'store/actions'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import Field from './PolicyFormField'


const PolicyForm = props => {
  const { loadPolicies, groupId, history } = props
  console.log(groupId)
  return (
    <Formik
      initialValues={{
        name: '',
        info: '',
        amount: 0,
      }}
      onSubmit={(values, formActions) => {
        const { name, info, amount } = values
        if(name==='' | info ==='' | name.length >20 | info.length >100){
          alert('Wrong Input')
        }else{
          apis.createPolicy({ name, info, amount, groupId }).then(loadPolicies({ groupId }))
          history.push({
            pathname: routes.POLICY_LIST,
            state: { groupId },
          })
        }
        
      }}
      render={() =>
        <Wrapper>
          <Icon name='chevron left'>
          <Link to={{
            pathname: routes.POLICY_LIST,
            state: { groupId },
          }}>
            PolicyList
          </Link>
          </Icon>
          <Title>Create Policy</Title>
          <hr/>
          <Form>
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>Policy Name</Div>
            <Field name='name' type='input' style={{borderColor:"black", borderWidth:"2px"}} placeholder='Policy Name'/>
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>Policy Info</Div>
            <Field name='info' type='input' component='textarea' style={{borderColor:"black", borderWidth:"2px", height:"15rem"}} placeholder='Information...'/>
            <Div style={{textDecoration:"none", textAlignLast:"center"}}>Fine</Div>
            <Field name='amount' type='number' placeholder='벌금'/>
            
            <br/>
            <br/>
            
            <div>
            <Button basic color='black' animated type='submit' style={{width: "100%", fontSize: "1.5rem", fontWeight: "20"}}><Button.Content visible>
                Policy 생성
              </Button.Content>
              <Button.Content hidden>
                <Icon style={{paddingTop: "0rem"}} name='add' />
              </Button.Content>
            </Button>
            </div>
          </Form>
        </Wrapper>
      }
    />
  )
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  loadPolicies: payload => dispatch(actionCreators.loadPolicies(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PolicyForm)
