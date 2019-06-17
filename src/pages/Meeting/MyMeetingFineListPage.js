import React from 'react'

import MyMeetingFineList from 'component/Meeting/MyMeetingFineList'

const MyMeetingFineListPage = props => {
  const { meetingId, groupId } = props.location.state
  return <MyMeetingFineList meetingId={meetingId} groupId={groupId}/>
}

export default MyMeetingFineListPage
