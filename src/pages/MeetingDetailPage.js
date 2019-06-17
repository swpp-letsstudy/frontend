import React from 'react'

import MeetingDetail from 'component/Meeting/MeetingDetail'

const MeetingDetailPage = props => {
  const { match, history } = props
  return <MeetingDetail match={match} history={history}/>
}

export default MeetingDetailPage