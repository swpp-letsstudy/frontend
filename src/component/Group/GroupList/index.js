import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components';

import LogoutButton from './LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'
import { Formik } from 'formik/dist/index'


import Form from './GroupListForm'
import Button from './GroupEnrollButton'
import Link from './GroupLink'
import Input from './GroupInput'

const Wrapper1 = styled.section`
  text-align: center;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  width: 25rem;
`;

class GroupList extends Component {
  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { username, groups, joinGroup } = this.props
    return (
      <>
        <Wrapper1>
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
              <GroupListStyle>
                <Link to={`${routes.GROUP_DETAIL.replace(':id', group.id)}`}>
                  {group.name}
                </Link>
              </GroupListStyle>
              <br />
            </Fragment>
          ))}
          <Link to={routes.GROUP_FORM}>그룹 생성</Link>
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
  joinGroup: url => dispatch(actionCreators.joinGroup(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
