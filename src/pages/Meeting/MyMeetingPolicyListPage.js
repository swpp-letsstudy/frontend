import React from 'react'

import MyMeetingPolicyList from 'component/Meeting/MyMeetingPolicyList'

const MyMeetingPolicyListPage = props => {
  const { meetingId, groupId } = props
  return <MyMeetingPolicyList meetingId={meetingId} groupId={groupId}/>
}

export default MyMeetingPolicyListPage
