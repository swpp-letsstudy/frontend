import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import LogoutButton from './LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'
import { Formik } from 'formik/dist/index'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Form from './GroupListForm'
import Button from './GroupEnrollButton'
import Link from './GroupLink'
import Input from './GroupInput'


class GroupList extends Component {
  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { username, groups, joinGroup } = this.props
    return (
      <>
        <Wrapper>
          <Title>Group Page</Title>
          <h1>{username}</h1>

          <Formik
            initialValues={{
              url: '',
            }}
            onSubmit={(values, formActions) => {
              const { url } = values
              joinGroup({ url })
            }}
            render={({ handleChange }) =>
              <Form>
                <div className="ui action input">
                  <Input
                    onChange={handleChange}
                    name='url'
                    type="text"
                    placeholder="Group URL..."
                  />
                  <Button type='submit'>
                    가입
                  </Button>
                </div>
              </Form>
            }
          />

          {groups.map((group, index) => (
            <Fragment key={index}>
              <Link to={`${routes.GROUP_DETAIL.replace(':id', group.id)}`}>
                {group.name}
              </Link>
              <br />
            </Fragment>
          ))}
          <Link to={routes.GROUP_FORM}>그룹 생성</Link>
          <LogoutButton />
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  username: state.userReducer.user.username,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
  joinGroup: url => dispatch(actionCreators.joinGroup(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
