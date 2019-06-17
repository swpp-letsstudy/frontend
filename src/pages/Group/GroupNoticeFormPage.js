import React from 'react'

import GroupNoticeForm from 'component/Group/GroupNotice/GroupNoticeForm'

const GroupNoticeFormPage = props => {
  const { groupId } = props.location.state
  return <GroupNoticeForm history={props.history} groupId={groupId}/>
}

export default GroupNoticeFormPage
