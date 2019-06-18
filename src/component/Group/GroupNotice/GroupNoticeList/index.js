import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import actionCreators from 'store/actions'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'
import Icon from 'component/Styles/Chevron'

import Link from './GroupLink'


class GroupList extends Component {
  componentDidMount() {
    const { loadGroupNotices, groupId, setInfo } = this.props
    setInfo({
      groupId,
      backurl: routes.GROUP_NOTICE_LIST,
    })
    loadGroupNotices({ groupId })
  }

  render() {
    const { groupNotices, groupId } = this.props
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
              GroupDetail
            </Link>
          </Icon>
          <Title>
            그룹 공지 목록
          </Title>
          <hr/>
          {groupNotices.map((groupNotice, index) => (
            <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
            <Fragment key={groupNotice.id}>
              <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':groupNoticeId', groupNotice.id),
                state: { groupId },
              }}>
                {groupNotice.title}
              </Link>
            </Fragment>
            </div>
          ))}
          <div style={{textAlign:"left",marginTop:"1.3rem",fontSize:"1.2rem"}}>
          <Link to={{
            pathname: routes.GROUP_NOTICE_FORM,
            state: { groupId }
          }}>
            그룹 공지 만들기
          </Link>
          </div>
        </Wrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  groupNotices: state.groupReducer.groupNotices,
})

const mapDispatchToProps = dispatch => ({
  loadGroupNotices: payload => dispatch(actionCreators.loadGroupNotices(payload)),
  setInfo: payload => dispatch(actionCreators.setInfo(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
