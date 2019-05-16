import React from 'react'
import { Form, Formik } from 'formik/dist/index'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import apis from 'apis'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Field from './GroupFormField'
import Button from './GroupFormButton'

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
          <Title>Create Group</Title>
          <Form>
            <div>
              <Field name='name' placeholder='group name' />
            </div>
            <div>
              <Field name='info' type='text' placeholder='informations...' style={{ height: "20rem" }} />
            </div>
            <Button type='submit'>그룹 생성</Button>
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
