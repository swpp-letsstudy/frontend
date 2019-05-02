import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import styled from 'styled-components';

import LogoutButton from 'component/LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'


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
    const { groups } = this.props
    return (
      <>
        <Wrapper1>
          <Title>Group Page</Title>

        </Wrapper1>

        <Wrapper1>
          {groups.map((group, index) => (
            <Fragment key={index}>
              <Link
                to={`${routes.GROUP_DETAIL}?${queryString.stringify({ id: group.id })}`}>

                <GroupListStyle>
                  {group.name}

                </GroupListStyle>
              </Link>
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
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)