import React from 'react'

import MeetingNoticeForm from 'component/Meeting/MeetingNotice/MeetingNoticeForm'

const MeetingNoticeFormPage = props => {
  const { meetingId } = props.location.state
  const { history } = props
  return <MeetingNoticeForm history={history} meetingId={meetingId}/>
}

export default MeetingNoticeFormPage
