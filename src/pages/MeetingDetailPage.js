import React from 'react'

import MeetingDetail from 'component/Meeting/MeetingDetail'

const MeetingDetailPage = props => (
  <MeetingDetail match={props.match} history={props.history}/>
)

export default MeetingDetailPage