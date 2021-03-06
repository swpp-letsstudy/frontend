import React, { Component } from 'react'
import { Formik, Form } from 'formik/dist/index'
import { Button } from 'semantic-ui-react'

import routes from 'routes'
import apis from 'apis'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import Field from './GroupField'

class GroupSetting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
    }
  }

  componentDidMount() {
    const { groupId } = this.props
    apis.getAttendanceFine({ groupId })
    .then(value => this.setState({ amount: value.data }))
  }

  render() {
    const { groupId, history } = this.props
    return (
      <Formik
        initialValues={{
            amount: 0,
        }}
        onSubmit={(values, formActions) => {
            const { amount } = values
            apis.setAttendanceFine({ groupId, amount })
            .then(history.push(routes.GROUP_DETAIL.replace(':groupId', groupId)))
        }}
        render={() =>
          <Wrapper>
            <Icon name='chevron left'>
              <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
                GroupDetail
              </Link>
            </Icon>
            
            <Title>Group Setting</Title>
            <hr/>

            <Div>결석 1회당 벌금: {this.state.amount}원</Div>
            <Form>
                <Field name='amount' type='number' />
                <Button basic color='black' compact type='submit' style={{width: "23%", fontSize:"1.2rem"}}>수정</Button>
            </Form>
          </Wrapper>
        }
      />
    )
  }
}

export default GroupSetting
