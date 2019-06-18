import React from 'react'

import MeetingList from 'component/Meeting/MeetingList'

const MeetingListPage = props => {
  const { groupId } = props.location.state
  return <MeetingList groupId={groupId} />
}

export default MeetingListPage