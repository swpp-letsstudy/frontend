import React, { Component, Fragment } from 'react'
import Link from './GroupLink'

import { connect } from 'react-redux'
import actionCreators from 'store/actions'

import routes from 'routes'

import Wrapper from 'component/Styles/Wrapper'
import Title from 'component/Styles/Title'

import Icon from 'component/Styles/Chevron'

class GroupNoticeList extends Component {
  componentDidMount() {
    const { groupId, loadGroupNotices } = this.props
    loadGroupNotices({ groupId })
  }

  render() {
    const { groupNotices, groupId } = this.props
    return (
      <>
        <Wrapper>
          <Icon name='chevron left'>
            <Link to={routes.GROUP_DETAIL.replace(':id', groupId)}>MeetingList</Link>
          </Icon>

          <Title>
            Group Notice List
          </Title>
          {groupNotices.map((notice, index) => (
            <Fragment key={notice.id}>
              <Link to={{
                pathname: routes.GROUP_NOTICE_DETAIL.replace(':id', notice.id),
                state: { groupId },
              }}>
                {notice.title}
              </Link>
              <br />
            </Fragment>
          ))}

          <Link to={{
            pathname: routes.GROUP_NOTICE_FORM,
            state: { groupId }
          }}>새로만들기</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupNoticeList)
