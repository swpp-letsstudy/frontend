import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actionCreators from 'store/actions'
import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'


class GroupList extends Component {
  componentDidMount() {
    const { loadGroupNotices, groupId } = this.props
    loadGroupNotices({ groupId })
  }

  render() {
    const { groupNotices, groupId } = this.props
    return (
      <>
        <Wrapper>
          <Link to={routes.GROUP_DETAIL.replace(':groupId', groupId)}>
            GroupDetail
          </Link>
          <Title>GroupNoticeList</Title>
          <br />
          <div>
            그룹 공지 목록
          </div>
          {groupNotices.map((groupNotice, index) => (
            <Fragment key={groupNotice.id}>
              <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':groupNoticeId', groupNotice.id),
                state: {
                  groupId,
                  backurl: routes.GROUP_NOTICE_LIST,
                },
              }}>
                {groupNotice.title}
              </Link>
            </Fragment>
          ))}
          <br />
          <Link to={{
            pathname: routes.GROUP_NOTICE_FORM,
            state: { groupId }
          }}>
            그룹 공지만들기
          </Link>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
