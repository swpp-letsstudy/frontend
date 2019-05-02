import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components';

import LogoutButton from './GroupLogout'
import actionCreators from 'store/actions'
import routes from 'routes'

import Link from './GroupLink'

const Wrapper1 = styled.section`
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
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


class GroupList extends Component {

  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { groups } = this.props
    return (
      <>
        <Wrapper1>
          <div>
            <Title>Group Page</Title>

          </div>

          <div>
            {groups.map((group, index) => (
              <Fragment key={index}>
                <Link to={`${routes.GROUP_DETAIL.replace(':id', group.id)}`}>
                  {group.name}
                </Link>
                <br />
              </Fragment>
            ))}
          </div>

          <div>
            <Link to={routes.GROUP_FORM}>그룹 생성</Link>
          </div>

          <LogoutButton />
        </Wrapper1>
      </>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
