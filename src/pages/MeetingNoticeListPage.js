import React from 'react'

import MeetingNoticeList from 'component/Meeting/MeetingNotice/MeetingNoticeList'

const MeetingNoticeListPage = props => {
  const { meetingId } = props.location.state
  return <MeetingNoticeList meetingId={meetingId} />
}

export default MeetingNoticeListPage
