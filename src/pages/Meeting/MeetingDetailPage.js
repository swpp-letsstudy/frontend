import React from 'react'

import MeetingDetail from 'component/Meeting/MeetingDetail'

const MeetingDetailPage = props => {
  const { backurl } = props.location.state
  const { meetingId } = props.match.params
  const { match, history } = props
  return <MeetingDetail match={match} history={history} meetingId={meetingId} backurl={backurl}/>
}

export default MeetingDetailPage