import React from 'react'
import GroupNoticeDetail from 'component/Group/GroupNotice/GroupNoticeDetail'

const GroupNoticeDetailPage = props => {
  const { groupId } = props.location.state
  const noticeId = props.match.params.id
  return <GroupNoticeDetail noticeId={noticeId} groupId={groupId}/>
}

export default GroupNoticeDetailPage
