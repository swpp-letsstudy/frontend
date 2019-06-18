import React from 'react'

import GroupNoticeList from 'component/Group/GroupNotice/GroupNoticeList'

const GroupListPage = props => {
  const { groupId } = props.location.state
  return <GroupNoticeList groupId={groupId}/>
}

export default GroupListPage
