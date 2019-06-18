import React from 'react'

import MeetingDetail from 'component/Meeting/MeetingDetail'

const MeetingDetailPage = props => {
  const { meetingId } = props.match.params
  const { match, history } = props
  return <MeetingDetail match={match} history={history} meetingId={meetingId}/>
}

export default MeetingDetailPage