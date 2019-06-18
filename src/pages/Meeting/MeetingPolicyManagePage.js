import React from 'react'

import MeetingPolicyManage from 'component/Meeting/MeetingPolicyManage'

const MeetingPolicyManagePage = props => {
  const { meetingId, groupId } = props.location.state
  return <MeetingPolicyManage meetingId={meetingId} groupId={groupId}/>
}

export default MeetingPolicyManagePage
