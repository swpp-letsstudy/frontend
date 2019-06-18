import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik/dist/index'

import routes from 'routes'
import apis from 'apis'

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
          <>
            <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
              GROUP_DETAIL
            </Link>
            <h1>GroupSetting</h1>
            <h2>결석 1회당 벌금: {this.state.amount}원</h2>
            <Form>
                <Field name='amount' type='number' />
                <button type='submit'>수정</button>
            </Form>
          </>
        }
      />
    )
  }
}

export default GroupSetting
