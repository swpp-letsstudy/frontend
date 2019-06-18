import React from 'react'

import GroupDetail from 'component/Group/GroupDetail'

const GroupDetailPage = props => {
  const { groupId } = props.match.params
  return <GroupDetail groupId={groupId} history={props.history}/>
}

export default GroupDetailPage
