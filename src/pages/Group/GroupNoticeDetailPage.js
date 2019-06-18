import React from 'react'

import GroupNoticeDetail from 'component/Group/GroupNotice/GroupNoticeDetail'

const GroupNoticeDetailPage = props => {
  const { groupId, backurl } = props.location.state
  const { groupNoticeId } = props.match.params
  return <GroupNoticeDetail groupNoticeId={groupNoticeId} groupId={groupId} history={props.history} backurl={backurl}/>
}

export default GroupNoticeDetailPage
