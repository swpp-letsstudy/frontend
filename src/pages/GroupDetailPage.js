import React from 'react'

import GroupDetail from 'component/Group/GroupDetail'

const GroupDetailPage = props => {
  const groupId = props.match.params.id
  return (
  <div>
    <GroupDetail groupId={groupId} history={props.history}/>
  </div>
  )
}

export default GroupDetailPage
