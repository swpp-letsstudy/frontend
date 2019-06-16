import React from 'react'

import MeetingNoticeDetail from 'component/Meeting/MeetingNotice/MeetingNoticeDetail'

const MeetingNoticeDetailPage = props => {
  const { meetingId } = props.location.state
  const noticeId = props.match.params.id
  return <MeetingNoticeDetail noticeId={noticeId} meetingId={meetingId} history={props.history}/>
}

export default MeetingNoticeDetailPage
