import React from 'react'

import GroupNoticeDetail from 'component/Group/GroupNotice/GroupNoticeDetail'

const GroupNoticeDetailPage = props => {
  const { groupId } = props.location.state
  const { groupNoticeId } = props.match.params
  return <GroupNoticeDetail groupNoticeId={groupNoticeId} groupId={groupId} history={props.history}/>
}

export default GroupNoticeDetailPage
