import React from 'react'

import MeetingNoticeDetail from 'component/Meeting/MeetingNotice/MeetingNoticeDetail'

const MeetingNoticeDetailPage = props => {
  const { meetingId } = props.location.state
  const { meetingNoticeId } = props.match.params
  return <MeetingNoticeDetail meetingNoticeId={meetingNoticeId} meetingId={meetingId} history={props.history}/>
}

export default MeetingNoticeDetailPage
