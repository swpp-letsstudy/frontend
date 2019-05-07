import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from 'styled-components';

import LogoutButton from 'component/LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'
import apis from 'apis'
import { Formik, Form, Field } from 'formik'


const Wrapper1 = styled.section`
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: black;
`;

const GroupListStyle = styled.h1`
  margin: auto;
  display: flex;
  height: 2.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-color: white;
  background: white;
  border-radius: 8px;
  width: 30rem;
`;

class GroupList extends Component {
  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { username, groups } = this.props
    return (
      <>
        <Wrapper1>
          <Title>Group Page</Title>
          <h1>{username}</h1>
        </Wrapper1>

        <Formik
          initialValues={{
            url: '',
          }}
          onSubmit={(values, formActions) => {
            const { url } = values
            apis.joinGroup({url})
          }}
          render={() =>
            <Form>
              <Field name='url'/>
              <button type='submit'>가입</button>
            </Form>
          }
        />

        <Wrapper1>
          {groups.map((group, index) => (
            <Fragment key={index}>
              <GroupListStyle>
                <Link to={`${routes.GROUP_DETAIL.replace(':id', group.id)}`}>
                  {group.name}
                </Link>
              </GroupListStyle>
              <br />
            </Fragment>
          ))}

        </Wrapper1>

        <Wrapper1>
          <Link to={routes.GROUP_FORM}>그룹 생성</Link>
        </Wrapper1>

        <Wrapper1>
          <LogoutButton />
        </Wrapper1>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
