import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import apis from 'apis'
import LogoutButton from './LogoutButton'
import actionCreators from 'store/actions'
import routes from 'routes'
import { Formik } from 'formik/dist/index'
import { Icon } from 'semantic-ui-react'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Link from 'component/Styles/Link'
import Div from 'component/Styles/Div'

import Form from './GroupListForm'
import Button from './GroupEnrollButton'
import Input from './GroupInput'


class GroupList extends Component {
  componentDidMount() {
    const { loadGroups } = this.props
    loadGroups()
  }

  render() {
    const { nickname, groups, loadGroups } = this.props
    return (
      <>
        <Wrapper>
          <Title>Group Page</Title>
          <h1 style={{fontSize: "1.5rem", textAlign: "center", marginTop: "0rem"}}>{nickname}</h1>
          <Formik
            initialValues={{
              url: '',
            }}
            onSubmit={(values, formActions) => {
              const { url } = values
              apis.joinGroup({ url }).then(loadGroups).catch(() => alert('invaild url'))
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
                  <Button type='submit' basic color='black' animated style={{textAlign:"center"}}>
                    <Button.Content visible>
                      가입
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name='sign in' />
                    </Button.Content>
                  </Button >
                </div>
              </Form>
            }
          />

          <hr/>
          <Div>
            그룹 목록
          </Div>
          {groups.map((group, index) => (
            <Fragment key={group.id}>
              <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
                <Link to={routes.GROUP_DETAIL.replace(':groupId', group.id)}>
                  {group.name}
                </Link>
              </div>
            </Fragment>
          ))}
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.5rem"}}>
            <Link to={routes.GROUP_FORM}>
              그룹만들기
            </Link>
          </div>

          <br />
          <br />

          <LogoutButton />
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  nickname: state.userReducer.user.nickname,
})

const mapDispatchToProps = dispatch => ({
  loadGroups: () => dispatch(actionCreators.loadGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
