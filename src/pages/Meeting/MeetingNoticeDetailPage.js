import React from 'react'

import MeetingNoticeDetail from 'component/Meeting/MeetingNotice/MeetingNoticeDetail'

const MeetingNoticeDetailPage = props => {
  const { meetingId, backurl } = props.location.state
  const { meetingNoticeId } = props.match.params
  return <MeetingNoticeDetail meetingNoticeId={meetingNoticeId} meetingId={meetingId} backurl={backurl} history={props.history}/>
}

export default MeetingNoticeDetailPage
