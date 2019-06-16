import React from 'react'

import MeetingNoticeForm from 'component/Meeting/MeetingNotice/MeetingNoticeForm'

const MeetingNoticeFormPage = props => {
  const { meetingId } = props.location.state
  return <MeetingNoticeForm history={props.history} meetingId={meetingId}/>
}

export default MeetingNoticeFormPage
